class Vehicle {
    // public drive(): void {
    //     console.log("vehicle class");
    // }

    /*
    color: string;

    constructor(color: string) {
        this.color = color;
    }
    */

    constructor(public color: string) {}

    protected honk(): void {
        console.log("beep");
    }
}

const vehicle = new Vehicle("black");
console.log(vehicle.color);

class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
        super(color);
    }

    //* we can't change modifier of overridden method in child class
    private drive(): void {
        console.log("car class");
    }

    startDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

// const vehicle = new Vehicle();
// vehicle.drive();
// vehicle.honk();

const car = new Car(4, "red");
car.startDrivingProcess();
