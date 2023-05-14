const drink = {
    color: "brown",
    carbonated: true,
    sugar: 40,
};

const pepsi = ["brown", true, 40]; //* currently it's typed as a heterogenous array, so we can very easily change order of elements inside this array

//> convert Array into Tuple
const cola: [string, boolean, number] = ["brown", true, 40];

//> we can use type alias instead of writing Tuple structure again and again
type Drink = [string, boolean, number];

const thumbsup: Drink = ["brown", true, 40];
const sprite: Drink = ["clear", true, 40];
