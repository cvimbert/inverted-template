import {Expressions} from "./expressions.class";
import escapeStringRegexp = require("escape-string-regexp");

export class TemplateExpression {

    private expressionRegExp: RegExp;
    private variables: string[] = [];

    constructor(
        private expressionText: string,
        contentFormat: RegExp = null
    ) {
        // variables extraction
        let regExpText: string = expressionText;

        regExpText = escapeStringRegexp(regExpText);
        regExpText = "^" + regExpText + "$";

        let res: RegExpExecArray = Expressions.variable.exec(expressionText);

        while (res) {
            regExpText = regExpText.replace("\\" + res[0], ".*");
            this.variables.push(res[0]);
            res = Expressions.variable.exec(expressionText);
        }

        this.expressionRegExp = new RegExp(regExpText);

        let testStr: string = "state(yes);sprite(ok)";
        console.log(regExpText, this.test(testStr));

        if (this.test(testStr)) {
            console.log(this.extract(testStr));
        }
    }

    test(text: string): boolean {
        return this.expressionRegExp.test(text);
    }

    exec(text: string): RegExpExecArray {
        return this.expressionRegExp.exec(text);
    }

    extract(text: string): {[key: string]: string} {
        let values: {[key: string]: string} = {};
        let extractionText: string = text;

        let tab: string[] = this.expressionText.split(Expressions.variable);
        console.log(text, tab);

        for (let i: number = 0; i < tab.length - 1; i++) {
            let variable: string = this.variables[i];
            let textElem: string = tab[i];
            let nextTextElem: string = tab[i + 1];
            let elemStartIndex: number = extractionText.indexOf(textElem);

            extractionText = extractionText.substring(elemStartIndex + textElem.length);

            let elemEndIndex: number = extractionText.indexOf(nextTextElem);

            values[variable] = extractionText.slice(0, elemEndIndex);
            extractionText = extractionText.substr(elemEndIndex);
        }

        return values;
    }
}