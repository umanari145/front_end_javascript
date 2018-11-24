//exportで外から読み込めるようになる
export class PersonClass{
  constructor (id, name) {
    this.id = id
    this.name = name
  }
  printName(){
    console.log(`${this.name} クラスの中に入れている名前です。`)
  }
}
