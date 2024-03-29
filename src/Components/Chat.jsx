import React from "react";
import { useState } from "react";
import OpenAIApi from "openai";
import "./Chat.css";
import ApiKey from "./Apikey";
export default function Chat() {
  const openai = new OpenAIApi({
    apiKey: localStorage.getItem("key"),
    dangerouslyAllowBrowser: true,
  });
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [askKey, setAskKey] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4-turbo-preview",
        stream: true,
      });
      //console.log(result.choices[0].message.content);
      //setApiResponse(result.choices[0].message.content);
      let output = "";
      for await (const chunk of result) {
        output += chunk.choices[0]?.delta?.content || "";
        setApiResponse(output);
      }
    } catch (e) {
      console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setAskKey(true);
  };
  return (
    askKey ? <ApiKey/> :
    <div className="Chat-Page">
      <div className="Chat-History"></div>
      <div className="Chat-Container">
        <p className="ChatTitle">Chat With GPT4</p>
        <div className="Chat">
          <textarea className="Response" value={apiResponse}></textarea>
          <form className="Question" onSubmit={handleSubmit}>
            <textarea
              className="in"
              type="text"
              value={prompt}
              placeholder="Ask anything..."
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              disabled={loading || prompt.length === 0}
              type="submit"
              className="btn"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>
        </div>
      </div>
      <div className="Account-Actions">
        <button className="Logout" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}
