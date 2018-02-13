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
[bidule($vari)]
*opt($optv);*yop($v1);yep($v2);
`);

console.log(template.extract(`
state(yes);sprite(ok)
bidule(test1)
bidule(restest)
yop(a);yep(b);
`));