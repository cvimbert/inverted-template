import {GroupType} from "./group-type.enum";
import {Expressions} from "./expressions.class";
import {TemplateExpression} from "./template-expression.class";

export class TemplateGroup {

    private expressions: TemplateExpression[] = [];
    type: GroupType = GroupType.BASIC;

    constructor(
        public textLine: string,
        contentFormat: RegExp = null
    ) {
        if (Expressions.arrayGroup.test(textLine)) {
            this.type = GroupType.ARRAY;
        }

        let expressionStrings: string[] = textLine.split(Expressions.or);

        expressionStrings.forEach((expression: string) => {
            this.expressions.push(new TemplateExpression(expression, contentFormat));
        });
    }

    test(text: string): boolean {
        return true;
    }
}