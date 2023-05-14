//# Type Annotations for Functions

//! we want to add type annotations for the values a function will receive and the type of value it will return

//> arrow function
const add = (a: number, b: number): number => {
    return a + b;
};

const subtract = (a: number, b: number) => {
    a - b; //* type inference will tell ts return type is void and it won't give any errors so always annotate return value
};

//> named function
function divide(a: number, b: number): number {
    return a / b;
}

//> anonymous function assigned to a variable
const multiply = function (a: number, b: number): number {
    return a * b;
};

//> void return type
const logger = (message: string): void => {
    console.log(message);
    //* a return type void can return null or undefined
    // return null; //! gives error now
    return undefined;
};

//> never return type, when func return nothing ever
const throwError = (message: string): never => {
    throw new Error(message);

    // if (!message) {
    //     throw new Error(message); //* better to use void in such a case, as there is nothing to return and we may throw error and never reach end of the function
    // }
};

//> Destructuring with Annotations

const todaysWeather = {
    date: new Date(),
    weather: "sunny",
};

//* { date: Date; weather: string } is the type annotation of forecast variable which is expected to be of type todaysWeather object
//* void is the expected return type of the function
const logWeather = (forecast: { date: Date; weather: string }): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
};

logWeather(todaysWeather);

//* ES6 Syntax, Destructuring and Annotation separated by our : as usual
const logWeather2 = ({
    date,
    weather,
}: {
    date: Date;
    weather: string;
}): void => {
    console.log(date);
    console.log(weather);
};

logWeather2(todaysWeather);
