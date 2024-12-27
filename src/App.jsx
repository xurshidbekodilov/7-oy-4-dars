import React, { useState, createContext, useContext } from "react";
import "./App.css";

const TodoContext = createContext();

export default function App() {
  const [todos, setTodos] = useState(["Vazifa 1", "Vazifa 2"]);
  const [shoppingList, setShoppingList] = useState([]);
  const [clipboard, setClipboard] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [text, setText] = useState("");
  const [format, setFormat] = useState({ bold: false, italic: false, underline: false });

  const handleTodoDrag = (e, index) => {
    e.dataTransfer.setData("text", index);
  };

  const handleTodoDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("text");
    const newTodos = [...todos];
    const [movedItem] = newTodos.splice(draggedIndex, 1);
    newTodos.splice(index, 0, movedItem);
    setTodos(newTodos);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = e.target.todo.value;
    if (newTodo) {
      setTodos([...todos, newTodo]);
      e.target.todo.value = "";
    }
  };

  const addShoppingItem = (e) => {
    e.preventDefault();
    const newItem = e.target.item.value;
    if (newItem) {
      setShoppingList([...shoppingList, newItem]);
      e.target.item.value = "";
    }
  };

  const copyItem = (item) => {
    navigator.clipboard.writeText(item);
    setClipboard(item);
  };

  const pasteItem = () => {
    if (clipboard) setShoppingList([...shoppingList, clipboard]);
  };

  const handleAvatarDrop = (e) => {
    const item = e.dataTransfer.getData("text");
    setAvatar([...avatar, item]);
  };

  const toggleFormat = (type) => {
    setFormat({ ...format, [type]: !format[type] });
  };

  return (
    <div className="app">

      <div className="section">
        <h2>Todo List</h2>
        <form onSubmit={addTodo}>
          <input type="text" name="todo" placeholder="Vazifa qo'shish" />
          <button type="submit">Qo'shish</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              draggable
              onDragStart={(e) => handleTodoDrag(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleTodoDrop(e, index)}
            >
              {todo}
            </li>
          ))}
        </ul>
      </div>


      <div className="section">
        <h2>Shopping List</h2>
        <form onSubmit={addShoppingItem}>
          <input type="text" name="item" placeholder="Mahsulot qo'shish" />
          <button type="submit">Qo'shish</button>
        </form>
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index} onClick={() => copyItem(item)}>
              {item}
            </li>
          ))}
        </ul>
        <button onClick={pasteItem}>Paste</button>
      </div>


      <div className="section">
        <h2>Avatar Customizer</h2>
        <div className="avatar">
          <div
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleAvatarDrop}
          >
            Drop Items Here
          </div>
          <div className="avatar-items">
            {avatar.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
        <div className="draggable-items">
          {["Soch", "Kiyim", "Aksessuar"].map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text", item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>


      <div className="section">
        <h2>Text Editor</h2>
        <textarea
          style={{
            fontWeight: format.bold ? "bold" : "normal",
            fontStyle: format.italic ? "italic" : "normal",
            textDecoration: format.underline ? "underline" : "none",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Matn yozing..."
        ></textarea>
        <div className="format-buttons">
          <button onClick={() => toggleFormat("bold")}>Bold</button>
          <button onClick={() => toggleFormat("italic")}>Italic</button>
          <button onClick={() => toggleFormat("underline")}>Underline</button>
        </div>
      </div>
    </div>
  );
}
