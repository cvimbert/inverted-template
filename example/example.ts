import {RevertedTemplate} from "../src/reverted-template.class";

/*let template:RevertedTemplate = new RevertedTemplate(`
$spriteId|sprite($spriteId)|state($stateId);sprite($spriteId)
[bidule($vari)]
*opt($optv);*yop($v1);yep($v2);
`);

console.log(template.extract(`
state(yes);sprite(ok)
bidule(test1)
bidule(restest)
opt(uuuu);yop(a);yep(b);
`));*/

let template2:RevertedTemplate = new RevertedTemplate(`
$nodeId
[*$conditionId:*$triggerId->$destNodeId]
`);

let eval1:Object = template2.extract(`
r2p4
cond1:rclick->nr2p3
jump->nr2p4s
lclick->ne2p1
`);

console.log("eval1", eval1);

let eval2:Object = template2.extract("e1p1;lclick->nr1p4;tclick->ne1p2");
console.log("eval2", eval2);