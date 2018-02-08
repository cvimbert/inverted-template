import {Expressions} from "./expressions.class";
import {TemplateGroup} from "./template-group.class";
import {GroupType} from "./group-type.enum";

export class RevertedTemplate {

    private groups: TemplateGroup[] = [];

    constructor(
        templateText: string,
        contentFormat: string = "([A-Za-z0-9]+)"
    ) {
        let groupLines = this.getGroups(templateText);

        groupLines.forEach((line: string) => {
            this.groups.push(new TemplateGroup(line, contentFormat));
        });
    }

    private getGroups(text: string): string[] {
        text = text.replace(Expressions.leftBracket, "[");
        text = text.replace(Expressions.rightBracket, "]");

        return this.splitGroups(text);
    }

    private splitGroups(text: string): string[] {
        return text.split(Expressions.groupSplitter).filter((line: string) => {
            return line !== "";
        });
    }

    extract(text: string): Object[] {

        let result: Object[] = [];

        let lineIndex: number = 0;
        let lines: string[] = this.splitGroups(text);

        let currentLine: string;

        for (let group of this.groups) {

            if (group.type === GroupType.BASIC) {

                currentLine = lines[lineIndex];

                if (group.test(currentLine)) {
                    result.push(group.extractFirstMatchingContent(currentLine));
                }

            } else if (group.type === GroupType.ARRAY) {

            }

        }

        return result;
    }
}