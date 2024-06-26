import React from "react";
import { useState } from "react";
import "./Apikey.css";
import Chat from "./Chat";
import OpenAIApi from "openai";

export default function Apikey() {

  const [key, setKey] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [wrongKey, setWrongKey] = useState(false);

  const tryKey = async () => {
    const openai = new OpenAIApi({
    apiKey: key,
    dangerouslyAllowBrowser: true,
    });
    try {
        const result = await openai.chat.completions.create({
          messages: [{ role: "system", content: "this is a test", }],
          max_tokens: 1,
          model: "gpt-3.5-turbo-1106",
        });
        console.log(result.choices[0].message.content);
        console.log("hiihii");
        setWrongKey(false);
        return true;
      } catch (e) {
        console.log(e);
        setWrongKey(true);
        return false;
      }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    let test = await tryKey ();
    if(test){    
        //setWrongKey(false);
        setShowChat(true);
        localStorage.setItem('showChat', true)
        localStorage.setItem('key', key)
    }
    else{
        setKey("")
    }
  };
  const handleChange = (event) => {
    setKey(event.target.value);
  };
  return (
    
    localStorage.getItem('showChat') ? <Chat/> :
    <div>
         <p className='Title'>
    Welcome
    </p>
    <form className = "Key-form" onSubmit={handleSubmit}>
        {wrongKey ? <div className="Error"> (Try again, you inputted an incorrect key) </div> : <></>}
      <div className="Input Container">
        <label className="Key-input-label">Enter your API key here:</label>
        <input
            type="text"
            name="api-key"
            className="Api-key"
            onChange={handleChange}
            value={key}
        />
      </div>
      <a href="https://platform.openai.com/docs/quickstart/account-setup" rel="noreferrer" target ="_blank" className="Key-Help">How do I get a key?</a>
      
    </form> 
     </div>
   
    
    
  
  );
}
