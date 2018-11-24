class PersonClass{
  constructor (id, name) {
    this.id = id
    this.name = name
  }
  printName(){
    console.log(`${this.name} クラスの中に入れている名前です。`)
  }
}

let personClass = new PersonClass(1, "太郎")
personClass.printName()


class StudentClass extends PersonClass{
  constructor(id , name, age ) {
    super(id, name)
    this.age = age
  }

  sendMessage(){
    console.log(`${this.name}の年齢は${this.age}です`)
  }

}

let stundent = new StudentClass(2, '松井', 35)
stundent.printName()
stundent.sendMessage()
