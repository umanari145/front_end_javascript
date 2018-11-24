console.log("他ファイルの読み込み --require")
const sample = require('./modules.js');
console.log(sample)
console.log(sample.value)
console.log(sample.sum(1,2))

const PersonClass = require('./lib/personClass.js');
const person = new PersonClass(999, '鈴木次郎');
console.log(person)
