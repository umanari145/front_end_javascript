console.log("他ファイルの読み込み")
import { sum } from './modules.js';
console.log(sum(1,2))

import { PersonClass } from './lib/personClass.js'
const person = new PersonClass(99,'山田太郎');
person.printName()
