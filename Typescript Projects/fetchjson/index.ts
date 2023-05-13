import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/1";

/*
{
"userId": 1,
"id": 1,
"title": "delectus aut autem",
"completed": false
}
*/

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

axios.get(url).then((response) => {
    const todo: Todo = response.data as Todo;

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);

    //* js won't throw any errors, we won't know about them unless we run the code
    /*
    const ID = todo.ID;
    const title = todo.Title;
    const finished = todo.finished;

    logTodo(id, completed, title);
    */
});

const logTodo = (id: number, title: string, completed: boolean) => {
    console.log(`
        The Todo with ID: ${id}
        Has a title of: ${title}
        Is it finished: ${completed}
        `);
};

/*
Both const todo = response.data as Todo and const todo: Todo = response.data are ways to cast response.data to the Todo interface in TypeScript.

The first one, const todo = response.data as Todo, uses the TypeScript type assertion syntax to tell the TypeScript compiler that you know for sure that response.data conforms to the Todo interface. This is known as a "type cast" or "type coercion", and it essentially tells the compiler to treat response.data as if it were a Todo object.

The second one, const todo: Todo = response.data, declares a variable todo of type Todo and assigns response.data to it. This tells the TypeScript compiler that todo is expected to be a Todo object, and it will raise a compilation error if response.data does not conform to the Todo interface.

In summary, the main difference between the two is that the first one is a runtime type assertion, while the second one is a compile-time type declaration. The second one provides stronger type safety guarantees, but the first one can be useful in certain situations where the TypeScript type system is not expressive enough to fully capture the shape of an object.
*/
