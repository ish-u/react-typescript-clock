// Tutorial - https://www.youtube.com/watch?v=gp5H0Vw39yw&ab_

// typescript code - looks similiar to JS
const a = "1";

// lets try to break something
// console.log('a',a.foo())
// Since foo() function does not exist ,thus, the tsc (compiler) won't convert it to JS

// Varibales - are created in the similiar way as JS
const hello = "world";

// This line would not compile beacuse hello is 'const'   
// hello = "foo";

// we can't assign differnet Type of Value to world variable like a Bool or Number 
// because it is assigned to be of "String" Type
let world: string = "world";
world = "W O R L D"; 


// Functions - All ECMAscript ways of writing funtion works in TypeScript
// We can specify the Types of Function Parameters in Function Arguments
// We can also specify the type of data that our Function will return
const aTypeScriptFunction = (a: string,b:string):string => {
    return a + " " + b;
};

// won't work
// console.log(aTypeScriptFunction(true,["foo"]))

// works
console.log(aTypeScriptFunction("hello","world"))


// Objects - Same as JS
// TS can read and understand object and it's properties
const user1 = {
    name:"Monster",
    age:5225
};

const user2={
    name:"JJJJJ"
};

// TS has Interfaces - helps us to create defined objects
interface User{
    name: string;
    age: number;
}
// This seems kinda like struct in C
const user3 : User = {
    name:"Monster",
    age:5225
}

// won't compile because it is not fully defined
// missing the age property
// const user4 : User = {
//     name:"Monster",
// }

// we can also have optional properties in Interfaces
// use '?' after property name to make it optional
interface UserV2{
    name: string;
    age?: number;
}

// We can have Functions inside Interfaces !!!
interface UserV3{
    name: string;
    age?: number;
    getMessage(): string;
}

const user4: UserV3 ={
    name : "A",
    age:1000,
    getMessage(){
        return "Hello" + name;
    }
}

console.log(user4.getMessage())

// Types Alias and Union
// Union Opertator - we can have more than one type using '|' pipe operator
interface UserInterface {
    name: string
    surname: string
}

let username : string = "Name";

let pageNumber : string | number = "1"

let error: string | null = null;

let user : UserInterface | null = null;

// Type Alias - Create your own custom Types
// we use the 'type' keyword to create custom Types
// an Type named ID derieved from String 
type ID = string;
type PopularTag = string;

// Union + Alias = !!!!
type MaybePopularTag = PopularTag | null;

// Datatypes in TS

// void - No Return
const aFunction = (): void => {
    console.log("Function");
}

// any - Return Anything
// kinda useless for TS
// avoid using 'any' at 'any cost'
const aFunction2 = (): any => {
    console.log("Function");
    return [];
}

// never - can't return anything 
// const aFunction2 = (): never => {
//     console.log("Function");
//     return [];
// }

// unknown - 
// good alt to any type
let vAny : any = 10;
let vUnkonwn : unknown = 10;

let x: string = vAny;
// can't assing a varibale whose type is Unknown
// let y : string = vUnkonwn;

// Type Assertion
// use 'as' keyword followed by type
let y : string = vUnkonwn as string;


// Working With DOM
// DOMElement are of Element Type - Highest in Hirerachy
// We need to use Type Assertion to correctly use Properties of DOM ELement b/c out of the box 
// these Elements are of Generic Types
// const someDOMElement = document.querySelector(".someClss") as HTMLInputElement;

// All DOM Element have their own properties
// console.log("ELEMENT" , someDOMElement.value)

// Adding Listener
const someDOMElement = document.querySelector(".someClss");

someDOMElement.addEventListener('blur', (event) => {
    console.log('event',event.target as HTMLInputElement);
})


// Classes in TS
// Classes in TS also have access specifiers - public, protected and private
// Interfaces can be implemented by Classes
// Classes in TS also have static value
// Classes in TS also supports Inheritance
interface UserInterfaceForUserClass {
    getFullName();
}

class UserClass implements UserInterfaceForUserClass{
    firstName : string
    lastName : string
    readonly somethingThatCanNotBeChanged

    constructor(firstName : string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.somethingThatCanNotBeChanged = "can't be changed once defined"
    }

    getFullName() : string {
        // won't work
        // this.somethingThatCanNotBeChanged = "trying to chnage"
        return this.firstName + " " + this.lastName;
    }
}

// Error
// const user5 = new UserClass(true,'bar') 
// Correct
const user5 = new UserClass('foo','bar') 


class Admin extends UserClass{
    private editor: string;

    setEditor(editor: string):void{
        this.editor = editor;
    }

    getEditor(): string{
        return this.editor
    }
}
// creating the object of Admin class
const admin = new Admin('fooo','bar');


// Generics 
// Works like Templates in C++ imo
// <T> : T can be any data type i.e works as a place holder
// We can also explicity state what type we want in Generic
// We can pass more than one generic types 
const addID = <T extends object>(obj :T) => {
    const id = "5a4f564fd56a4a6545s6d"
    return {
        ...obj,
        id
    }
}

const user6: UserInterface = {
    name: 'Name',
    surname: 'Surname'
}

// using the UserInterface as type in Generic
const r = addID<UserInterface>(user6)
console.log(r)

// won't work
// const q = addID<UserInterface>("user6")

// Interfaces can also be Generic
interface UserInterfaceV2<T> {
    name: string
    surname: string
    data:T
}

const user8: UserInterfaceV2<{meta :string}> = {
    name: 'foo',
    surname: 'bar',
    data:{
        meta:"oo"
    }
}

// Enums in TS
// to enumerate
// const statues = {
//     notStarted: 0,
//     inProgess : 1,
//     done: 2
// }

// we can also have values for enums keys
enum Status {
    NotStarted,
    InProgess ,
    Done
}

console.log(Status.InProgess) // prints 1