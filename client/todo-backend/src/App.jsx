import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:3000");
      setTodo(response.data.todos);
    }
    getData();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const response = await axios.post("http://localhost:3000/todo", {
      title: input,
    });
    console.log(response.data);
    setTodo([...todo, response.data.todo]);
    setInput("");
  };

  const editTodo = async (editTodo) => {
    const title = prompt("Enter updated todo", editTodo.title);
    if (!title.trim()) return;
    const response = await axios.put(
      `http://localhost:3000/todo/${editTodo.id}`,
      {
        title,
      }
    );
    const index = todo.findIndex((item) => item.id === +editTodo.id);
    todo[index].title = title;
    setTodo([...todo]);
    console.log(response.data);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:3000/todo/${id}`);
    setTodo((todos) => {
      todos = todo.filter((item) => item.id != +id);
      return todos;
    });
    console.log(response.data);
  };

  return (
    <>
      <h1>Todo App</h1>
      <div>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div>
        {!!todo.length ? (
          <ul>
            {todo.map((item) => (
              <li key={item.id}>
                {item.title}{" "}
                <button onClick={() => editTodo(item)}>Edit</button>
                <button onClick={() => deleteTodo(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <h2>No todo Added</h2>
        )}
      </div>
    </>
  );
};

export default App;
