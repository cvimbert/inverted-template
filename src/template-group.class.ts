import {GroupType} from "./group-type.enum";
import {Expressions} from "./expressions.class";
import {TemplateExpression} from "./template-expression.class";

export class TemplateGroup {

    private expressions: TemplateExpression[] = [];
    type: GroupType = GroupType.BASIC;

    constructor(
        public textLine: string,
        contentFormat: string = null
    ) {
        if (Expressions.arrayGroup.test(textLine)) {
            this.type = GroupType.ARRAY;
        }

        let expressionStrings: string[] = textLine.split(Expressions.or);

        expressionStrings.forEach((expression: string) => {
            this.expressions.push(new TemplateExpression(expression, contentFormat));
        });

        /*let testStr: string = "state(yes);sprite(ok)";
        console.log(this.extractFirstMatchingContent(testStr));*/
    }

    test(text: string): boolean {

        for (let expression of this.expressions) {
            if (expression.test(text)) {
                return true;
            }
        }

        return false;
    }

    extractFirstMatchingContent(text: string): {[key: string]: string} {

        for (let expression of this.expressions) {
            let content: {[key: string]: string} = expression.extract(text);

            if (content) {
                return content;
            }
        }

        return null;
    }
}