// Tutorial - https://www.youtube.com/watch?v=gp5H0Vw39yw&ab_channel=freeCodeCamp.org
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// typescript code - looks similiar to JS
var a = "1";
// lets try to break something
// console.log('a',a.foo())
// Since foo() function does not exist ,thus, the tsc (compiler) won't convert it to JS
// Varibales - are created in the similiar way as JS
var hello = "world";
// This line would not compile beacuse hello is 'const'   
// hello = "foo";
// we can't assign differnet Type of Value to world variable like a Bool or Number 
// because it is assigned to be of "String" Type
var world = "world";
world = "W O R L D";
// Functions - All ECMAscript ways of writing funtion works in TypeScript
// We can specify the Types of Function Parameters in Function Arguments
// We can also specify the type of data that our Function will return
var aTypeScriptFunction = function (a, b) {
    return a + " " + b;
};
// won't work
// console.log(aTypeScriptFunction(true,["foo"]))
// works
console.log(aTypeScriptFunction("hello", "world"));
// Objects - Same as JS
// TS can read and understand object and it's properties
var user1 = {
    name: "Monster",
    age: 5225
};
var user2 = {
    name: "JJJJJ"
};
// This seems kinda like struct in C
var user3 = {
    name: "Monster",
    age: 5225
};
var user4 = {
    name: "A",
    age: 1000,
    getMessage: function () {
        return "Hello" + name;
    }
};
console.log(user4.getMessage());
var username = "Name";
var pageNumber = "1";
var error = null;
var user = null;
// Datatypes in TS
// void - No Return
var aFunction = function () {
    console.log("Function");
};
// any - Return Anything
// kinda useless for TS
// avoid using 'any' at 'any cost'
var aFunction2 = function () {
    console.log("Function");
    return [];
};
// never - can't return anything 
// const aFunction2 = (): never => {
//     console.log("Function");
//     return [];
// }
// unknown - 
// good alt to any type
var vAny = 10;
var vUnkonwn = 10;
var x = vAny;
// can't assing a varibale whose type is Unknown
// let y : string = vUnkonwn;
// Type Assertion
// use 'as' keyword followed by type
var y = vUnkonwn;
// Working With DOM
// DOMElement are of Element Type - Highest in Hirerachy
// We need to use Type Assertion to correctly use Properties of DOM ELement b/c out of the box 
// these Elements are of Generic Types
// const someDOMElement = document.querySelector(".someClss") as HTMLInputElement;
// All DOM Element have their own properties
// console.log("ELEMENT" , someDOMElement.value)
// Adding Listener
var someDOMElement = document.querySelector(".someClss");
someDOMElement.addEventListener('blur', function (event) {
    console.log('event', event.target);
});
var UserClass = /** @class */ (function () {
    function UserClass(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.somethingThatCanNotBeChanged = "can't be changed once defined";
    }
    UserClass.prototype.getFullName = function () {
        // won't work
        // this.somethingThatCanNotBeChanged = "trying to chnage"
        return this.firstName + " " + this.lastName;
    };
    return UserClass;
}());
// Error
// const user5 = new UserClass(true,'bar') 
// Correct
var user5 = new UserClass('foo', 'bar');
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Admin.prototype.getEditor = function () {
        return this.editor;
    };
    return Admin;
}(UserClass));
// creating the object of Admin class
var admin = new Admin('fooo', 'bar');
// Generics 
// Works like Templates in C++ imo
// <T> : T can be any data type i.e works as a place holder
// We can also explicity state what type we want in Generic
// We can pass more than one generic types 
var addID = function (obj) {
    var id = "5a4f564fd56a4a6545s6d";
    return __assign(__assign({}, obj), { id: id });
};
var user6 = {
    name: 'Name',
    surname: 'Surname'
};
// using the UserInterface as type in Generic
var r = addID(user6);
console.log(r);
var user8 = {
    name: 'foo',
    surname: 'bar',
    data: {
        meta: "oo"
    }
};
// Enums in TS
// to enumerate
// const statues = {
//     notStarted: 0,
//     inProgess : 1,
//     done: 2
// }
// we can also have values for enums keys
var Status;
(function (Status) {
    Status[Status["NotStarted"] = 0] = "NotStarted";
    Status[Status["InProgess"] = 1] = "InProgess";
    Status[Status["Done"] = 2] = "Done";
})(Status || (Status = {}));
console.log(Status.InProgess); // prints 1
