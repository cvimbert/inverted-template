import {RevertedTemplate} from "../src/reverted-template.class";

/*let template:RevertedTemplate = new RevertedTemplate(`
$spriteId|sprite($spriteId)|state($stateId)

[

*$conditionId:*$triggerName->$stateId
]


op
`);*/


let template:RevertedTemplate = new RevertedTemplate(`
$spriteId|sprite($spriteId)|state($stateId);sprite($spriteId)
`);