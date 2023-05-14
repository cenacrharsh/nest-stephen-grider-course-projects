//# Type Annotations for Variables
let apples: number = 5;

let speed: string = "fast";

let hasName: boolean = true;

let nothingMuch: null = null;

let nothing: undefined = undefined;

//> built in objects
let now: Date = new Date();

//> Array
let colors: string[] = ["red", "green", "blue"]; //* colors will be an array of strings

let myNumbers: number[] = [1, 2, 3];

let truths: boolean[] = [true, false, false];

//> Classes
class Car {}

let car: Car;

//> Object Literal
let point: {
    x: number;
    y: number;
} = {
    x: 10,
    y: 20,
};

//> Function
//* (i: number) => void is the type annotation of the function, the type of value it will receive and the type of value it will return
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
};

//# When to use type annotations

//! 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json); //* JSON.parse() returns a value of type any, so we have to tell ts the type of value we are expecting
console.log(coordinates);

//! 2) When we declare a variable in one line, and initialize it later
let words = ["red", "green", "blue"];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
    if (words[i] === "green") {
        foundWord = true;
    }
}

//! 3) Variable whose type can not be inferred correctly
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false; //* if num > 0 exists then store it in this variable but if not store false

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
        numberAboveZero = numbers[i];
    }
}
