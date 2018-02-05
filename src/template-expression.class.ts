import {Expressions} from "./expressions.class";

export class TemplateExpression {

    private expressionRegExp: RegExp;

    constructor(
        expressionText: string
    ) {
        // variables extraction
        let regExpText: string = "^" + expressionText + "$";
        let res: RegExpExecArray = Expressions.variable.exec(expressionText);

        while (res) {
            regExpText = regExpText.replace(res[0], ".*");
            res = Expressions.variable.exec(expressionText);
        }

        this.expressionRegExp = new RegExp(regExpText);
        console.log(regExpText, this.test("sprite(ok)"));
    }

    test(text: string): boolean {
        return this.expressionRegExp.test(text);
    }

    exec(text: string): RegExpExecArray {
        return this.expressionRegExp.exec(text);
    }
}