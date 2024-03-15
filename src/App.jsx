import { useEffect, useState } from "react";
import Header from "./assets/components/Header";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));
  const [item, setItem] = useState(todos);

  const deleteItem = (id) => {
    const updatedItems = item.filter((item) => item.id !== id);
    setItem(updatedItems);
    return (
      <div>
        <h1>Elementlar ro'yxati</h1>
        <ul>
          {item.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  function getData() {
    let data = [];
    if (localStorage.getItem("todos")) {
      data = JSON.parse(localStorage.getItem("todos"));
    }
    return data;
  }

  function handleClick(e) {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      name: name,
      satatus: false,
    };
    let old = getData();
    old.push(todo);
    localStorage.setItem("todos", JSON.stringify(old));
    setName("");
    let copied = JSON.parse(JSON.stringify(todos));
    copied.push(todo);

    setTodos(copied);
  }
  return (
    <>
      <div className="todos w-50 mx-auto border border-2 rounded mt-4">
        <Header></Header>
        <form>
          <div className="input-group mb-3 p-4">
            <input
              type="text"
              className="form-control "
              placeholder="Enter todo..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              onClick={handleClick}
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
            >
              Button
            </button>
          </div>
        </form>
        <div className="todo-wrapper">
          {todos &&
            todos.map((el, index) => {
              return (
                <div
                  key={index}
                  className="todo-item d-flex justify-content-between "
                >
                  <div className="todo-check ">
                    <input className="check " type="checkbox" />
                    <p className="check-info ">{el.name}</p>
                  </div>
                  <div className="action">
                    <button className="edit">Edit</button>
                    <button
                      id={todos.index}
                      className="delete"
                      onClick={deleteItem}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
