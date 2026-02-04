import { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItem }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { 
      id: Date.now(), 
      description, 
      quantity, 
      packed: false 
    };

    onAddItem(newItem);
    newDescription("");
    newQuantity(1);
  }

  const [description, newDescription] = useState("");
  const [quantity, newQuantity] = useState(1);

  function changeDesc(e) {
    const desc = e.target.value;
    newDescription(desc);
  }

  function changeQuan(e) {
    const quan = Number(e.target.value);
    newQuantity(quan);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={changeQuan}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={changeDesc}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items }) { 
  function Item(description, quantity, packed) {
    return (
      <li style={{ textDecoration: packed ? "line-through" : "" }}>
        {description} ({quantity}x)
      </li>
    );
  }

  return (
    <div className="list">
      <ul>
        {items.map((item) =>
          Item(item.description, item.quantity, item.packed)
        )}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        You have {numItems} items in the list. You already packed {numPacked} ({percentage}%).
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems); 

  function handleAddItem(newItem) { 
    setItems((prevItems) => [...prevItems, newItem]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem}/>
      <PackingList items={items}/>
      <Stats items={items}/>
    </div>
  );
}

export default App;