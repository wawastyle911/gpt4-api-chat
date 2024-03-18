import React from "react";
import { useState } from "react";
import "./Apikey.css";
import Chat from "./Chat";

export default function Apikey() {

  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(key);
    setShow(true);
  };
  const handleChange = (event) => {
    setKey(event.target.value);
  };
  return (
    
    show ? <Chat data={key}/> :
    <form onSubmit={handleSubmit}>
      <label className="Key-input-label">Enter your API key here:</label>
      <input
        type="text"
        name="api-key"
        className="Api-key"
        onChange={handleChange}
        value={key}
      />
    </form>
    
  
  );
}
