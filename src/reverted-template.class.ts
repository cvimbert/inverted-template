import {Expressions} from "./expressions.class";
import {TemplateGroup} from "./template-group.class";

export class RevertedTemplate {

    private groups: TemplateGroup[] = [];

    constructor(
        templateText: string,
        contentFormat: RegExp = Expressions.content
    ) {
        let groupLines = this.getGroupLines(templateText);

        groupLines.forEach((line: string) => {
            this.groups.push(new TemplateGroup(line, contentFormat));
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