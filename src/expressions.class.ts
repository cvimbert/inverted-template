export class Expressions {

    // template variable
    static variable: RegExp = /\$[A-Za-z0-9]+/g;

    // left bracket
    static leftBracket: RegExp = /\[\n*/;

    // right bracket
    static rightBracket: RegExp = /\n*\]/;

    // used to split groups
    static groupSplitter: RegExp = /\n+/;

    // array group
    static arrayGroup: RegExp = /^\[.*\]$/;

    // or
    static or: RegExp = /\s*\|\s*/;

    // optional
    static optional: RegExp = /\s*\*.*\*\s*/;

    // content format
    static content: RegExp = /([A-Za-z0-9]+)/;
}