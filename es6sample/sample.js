let name = "太朗"
console.log(name)
//再宣言は下記のようなエラーが起きる Uncaught SyntaxError: Identifier 'name' has already been declared
//let name = "二郎"
//再宣言は問題ない
name = "二郎"

const sampleId = "9211"
console.log(sampleId)
//再代入はエラー
//Uncaught TypeError: Assignment to constant variable.
//sampleId  = "11111"

//ブロックスコープ
{
  let x = 1
  console.log(x)
}
//エラー
//Uncaught ReferenceError: x is not defined
//console.log(x)

//初期値の設定
function joinChannnel(name = "長渕")
{
  console.log(name)
}

joinChannnel()
joinChannnel('清原')


//関数の書き方
const add = function(a, b) {
  return a+b
}

console.log(add(10,11))

//アロー関数
const add2 = (a, b) => {
  return a+b
}

console.log(add2(20,21))

//アロー関数 return省略
const add3 = (a, b) =>  a+b
console.log(add3(30,31))

const person = {
  name: '太郎',
  lazy_hello:function(){
    //thisが指しているのはPerson
    console.log(`${this.name}を画面に出力します。1`)
  }
}
person.lazy_hello()

//1秒後に画面にだす
const person2 = {
  name: '太郎',
  lazy_hello:function(){
    setTimeout(function(){
      //thisが指しているのはwindowなため画面に出ない
      console.log(`${this.name}を画面に出力します。2`)
    }, 1000)
  }
}
person2.lazy_hello()

//1秒後に画面にだす
const person3 = {
  name: '太郎',
  lazy_hello:function(){
    setTimeout(function(){
      //bindによってスコープをコントロール
      console.log(`${this.name}を画面に出力します。3`)
    }.bind(this), 1000)
  }
}
person3.lazy_hello()

//1秒後に画面にだす
const person4 = {
  name: '太郎',
  lazy_hello:function(){
    setTimeout(() =>
      //アロー関数だとスコープが参照元になる
      console.log(`${this.name}を画面に出力します。4`)
    , 1000)
  }
}
person4.lazy_hello()
