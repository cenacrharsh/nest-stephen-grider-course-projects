//* if initializing as an empty array give annotation else it will be of type never[]
const emptyArray = [];

const carMakers = ["ford", "toyota"];

const dates = [new Date(), new Date()];

//> 2D arrays
const carsByMake = [["f150"], ["corolla"]];

/*
So, where the experience previously was

* Compile with --strictNullChecks and --noImplicitAny
var a = [];  // Error: Variable 'a' implicitly has an 'any[]' type
a.push(5);
the experience now becomes

* Compile with --strictNullChecks
var a = [];  // Type of a is never[]
a.push(5);   // Error: Argument of type 'number' is not assignable to parameter of type 'never'
Of course, when a type annotation is present there is no error:

* Compile with --strictNullChecks
var a: number[] = [];
a.push(5);
*/

//# Why do we need type annotations with arrays

//! 1) Helps with inference when extracting values
const car = carMakers[0]; //* ts knows car is string as carMakers is an array of strings

const myCar = carMakers.pop();

//! 2) Prevents incompatible values
// carMakers.push(100);

//! 3) Help with map/forEach/reduce
//* ts knows the callback func will receive a value of type string
carMakers.map((car: string): string => {
    return car;
});

//! 4) Flexible types
const importantDates: (Date | string)[] = [new Date()];
importantDates.push("1/1/2023");
importantDates.push(new Date());
