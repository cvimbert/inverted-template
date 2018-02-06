import {Expressions} from "./expressions.class";
import escapeStringRegexp = require("escape-string-regexp");

export class TemplateExpression {

    private expressionRegExp: RegExp;
    private variables: string[] = [];

    constructor(
        private expressionText: string
    ) {
        // variables extraction
        expressionText = escapeStringRegexp(expressionText);
        let regExpText: string = "^" + expressionText + "$";

        // TODO: faire un escape sur les caractères spéciaux (à voir si c'est utile)

        //regExpText = RegExp.escape(regExpText);
        //regExpText = regExpText.replace("*", "\\*");
        //regExpText = regExpText.replace("[", "\\[");

        let res: RegExpExecArray = Expressions.variable.exec(expressionText);

        while (res) {
            regExpText = regExpText.replace(res[0], ".*");
            this.variables.push(res[0]);
            res = Expressions.variable.exec(expressionText);
        }

        console.log(this.variables);

        this.expressionRegExp = new RegExp(regExpText);
        console.log(this.expressionRegExp);

        let testStr: string = "sprite(ok);state(yes)";
        console.log(regExpText, this.test(testStr));
        console.log(this.extract(testStr));
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

        tab.forEach((textElem: string, index: number) => {
            let elemIndex:number = extractionText.indexOf(textElem);
            console.log(elemIndex);

            if (elemIndex !== -1) {
                extractionText = extractionText.substr(elemIndex + textElem.length);
                console.log("el", elemIndex, extractionText);
            } else {
                return null;
            }
        });

        console.log("ext", extractionText);

        return values;
    }
}