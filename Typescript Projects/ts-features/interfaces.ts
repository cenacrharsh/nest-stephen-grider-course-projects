// interface Vehicle {
//     name: string;
//     year: Date;
//     broken: boolean;
//     summary(): string; // summary is a function with no arg and returns a string
// }

//! one interface will work for different kinds of objects
interface Reportable {
    summary(): string;
}

const oldCivic = {
    name: "civic",
    year: new Date(),
    broken: true,
    summary(): string {
        return `Name: ${this.name}`;
    },
};

const drink = {
    color: "brown",
    carbonated: true,
    sugar: 40,
    summary(): string {
        return `My drink has ${this.sugar} grams of sugar`;
    },
};

const printSummary = (item: Reportable): void => {
    console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink);

/*
const printVehicle = (vehicle: Reportable): void => {
    console.log(vehicle.summary());

    // console.log(`
    // Name: ${vehicle.name}
    // Year: ${vehicle.year}
    // Broken: ${vehicle.broken}
    // `);
};

printVehicle(oldCivic); //* no error is thrown in oldCivic has extra properties in it, all it matters is all properties in Vehicle must be there
*/
