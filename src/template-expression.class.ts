import {Expressions} from "./expressions.class";
import escapeStringRegexp = require("escape-string-regexp");

export class TemplateExpression {

    private expressionRegExp: RegExp;
    private variables: string[] = [];
    private contentRegExp: RegExp;
    private optionalExpressions: TemplateExpression[] = [];

    constructor(
        private expressionText: string,
        contentFormat: string = null
    ) {
        // variables extraction
        let regExpText: string = expressionText;

        regExpText = escapeStringRegexp(regExpText);
        regExpText = `^${regExpText}$`;

        // here for optional expressions

        let optionsRes: RegExpExecArray = Expressions.optional.exec(expressionText);

        while (optionsRes) {
            expressionText = expressionText.replace(optionsRes[0], "");
            let subExpText: string = optionsRes[0].replace(/\*/g, "");

            let replacement: string = "(" + escapeStringRegexp(optionsRes[0].substring(1, optionsRes[0].length - 1)) + ")?";
            regExpText = regExpText.replace(escapeStringRegexp(optionsRes[0]), replacement);

            this.optionalExpressions.push(new TemplateExpression(subExpText, contentFormat));
            optionsRes = Expressions.optional.exec(expressionText);
        }

        let res: RegExpExecArray = Expressions.variable.exec(expressionText);

        while (res) {
            regExpText = regExpText.replace(`\\${res[0]}`, contentFormat);
            this.variables.push(res[0]);
            res = Expressions.variable.exec(expressionText);
        }

        this.expressionRegExp = new RegExp(regExpText);
        this.contentRegExp = new RegExp(contentFormat);

        expressionText = expressionText.replace(Expressions.optional, "");
        console.log(expressionText);
        console.log(this.expressionRegExp);
    }

    test(text: string): boolean {
        return this.expressionRegExp.test(text);
    }

    exec(text: string): RegExpExecArray {
        return this.expressionRegExp.exec(text);
    }

    extract(text: string): {[key: string]: string} {

        // TODO: à supprimer quand les expressions optionnelles sont prêtes
        let cleanExpressionText: string = this.expressionText.replace(Expressions.optional, "");

        if (this.test(text)) {
            let values: {[key: string]: string} = {};
            let extractionText: string = text;

            let tab: string[] = cleanExpressionText.split(Expressions.variable);

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
}