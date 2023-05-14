//# Type Annotations for Objects

const profile = {
    name: "harsh",
    age: 20,
    coordinates: {
        latitude: 0,
        longitude: 15,
    },
    setAge(age: number): void {
        this.age = age;
    },
};

//> Annotations with Destructuring

//* we have to write the expected structure of profile, so it has to be an object with property age that is a number
const { age }: { age: number } = profile;

// const { age, name }: { age: number; name: string } = profile;

const {
    coordinates: { latitude, longitude },
}: {
    coordinates: {
        latitude: number;
        longitude: number;
    };
} = profile;
