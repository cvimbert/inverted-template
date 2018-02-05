import {Expressions} from "./expressions.class";
import {TemplateGroup} from "./template-group.class";

export class InvertedTemplate {

    private groups: TemplateGroup[] = [];

    constructor(
        templateText: string
    ) {
        let groupLines = this.getGroupLines(templateText);

        groupLines.forEach((line: string) => {
            this.groups.push(new TemplateGroup(line));
        });
    }

    getGroupLines(text: string): string[] {

        text = text.replace(Expressions.leftBracket, "[");
        text = text.replace(Expressions.rightBracket, "]");

        return text.split(Expressions.groupSplitter).filter((line: string) => {
            return line !== "";
        });
    }
}