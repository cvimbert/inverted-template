import {LineType} from "./line-type.enum";
import {Expressions} from "./expressions.class";
import {TemplateExpression} from "./template-expression.class";

export class TemplateGroup {

    private expressions: TemplateExpression[] = [];
    type: LineType = LineType.BASIC;

    constructor(
        public textLine: string
    ) {
        if (Expressions.arrayGroup.test(textLine)) {
            this.type = LineType.ARRAY;
        }

        let expressionStrings: string[] = textLine.split(Expressions.or);

        expressionStrings.forEach((expression: string) => {
            this.expressions.push(new TemplateExpression(expression));
        });
    }
}