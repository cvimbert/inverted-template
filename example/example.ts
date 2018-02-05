import {InvertedTemplate} from "../src/inverted-template.class";

let template:InvertedTemplate = new InvertedTemplate(`
$spriteId|sprite($spriteId)|state($stateId)

[

*$conditionId:*$triggerName->$stateId
]


op
`);