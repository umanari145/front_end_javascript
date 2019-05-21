console.log("他ファイルの読み込み --import")
import {sum} from './modules.js';
console.log(sum(1,2))

//defaultがない場合は{}をつける必要あり
import {PersonClass} from './lib/personClass.js'
//下記はエラー
//import PersonClass from './lib/personClass.js'
const person = new PersonClass(99,'PersonClass');
person.printName()

//下記のように別名も可能
import {PersonClass as pclass} from './lib/personClass.js'
//下記はエラー
//import PersonClass from './lib/personClass.js'
const p = new pclass(99,'pclass');
p.printName()

//defaultが付いている場合は命名が決定している
import MemberClass from './lib/memberClass.js'
//下記はエラー
//import {memberClass} from './lib/memberClass.js'
//名前を変えるのはあり
//import mClass from './lib/memberClass.js'
const member = new MemberClass(99,'default');
member.printName()

//const member = new memberClass(99,'山田太郎');
//member.printName()
