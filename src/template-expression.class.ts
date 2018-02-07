import {Expressions} from "./expressions.class";
import escapeStringRegexp = require("escape-string-regexp");

export class TemplateExpression {

    private expressionRegExp: RegExp;
    private variables: string[] = [];
    private contentRegExp: RegExp;

    constructor(
        private expressionText: string,
        contentFormat: string = null
    ) {
        // variables extraction
        let regExpText: string = expressionText;

        regExpText = escapeStringRegexp(regExpText);
        regExpText = "^" + regExpText + "$";

        let res: RegExpExecArray = Expressions.variable.exec(expressionText);


        // TODO: remplacer .* par une valeur plus stricte, ce qui évitera un test de structure
        while (res) {
            regExpText = regExpText.replace("\\" + res[0], contentFormat);
            this.variables.push(res[0]);
            res = Expressions.variable.exec(expressionText);
        }

        this.expressionRegExp = new RegExp(regExpText);
        this.contentRegExp = new RegExp(contentFormat);
    }

    test(text: string): boolean {
        return this.expressionRegExp.test(text);
    }

    exec(text: string): RegExpExecArray {
        return this.expressionRegExp.exec(text);
    }

    extract(text: string): {[key: string]: string} {

        if (this.test(text)) {
            let values: {[key: string]: string} = {};
            let extractionText: string = text;

            let tab: string[] = this.expressionText.split(Expressions.variable);

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
        } else {
            return null;
        }
    }


    // TODO: à supprimer, plus utile à priori
    extractMatchingContent(text: string): {[key: string]: string} {
        let values: {[key: string]: string} = this.extract(text);

        if (values) {
            let keys: string[] = Object.keys(values);

            for (let key of keys) {
                if (!this.contentRegExp.test(values[key])) {
                    return null;
                }
            }

            return values;
        } else {
            return null;
        }
    }
}