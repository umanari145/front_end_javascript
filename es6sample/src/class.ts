class PersonClass {
  id: number;
  name: string;

  constructor (id: number, name: string) {
    this.id = id
    this.name = name
  }

  printName(): void{
    console.log(`${this.name} クラスの中に入れている名前です。`)
  }
}

let personClass = new PersonClass(1, "太郎")
personClass.printName()


class StudentClass extends PersonClass{
  
  id: number;
  name: string;
  age: number;

  constructor(id: number, name: string, age: number) {
    super(id, name)
    this.age = age
  }

  sendMessage(): void{
    console.log(`${this.name}の年齢は${this.age}です`)
  }

}

let stundent = new StudentClass(2, '松井', 35)
stundent.printName()
stundent.sendMessage()
