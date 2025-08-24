import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const interval = setInterval(() => {
      // API polling -
      // API polling is when a client repeatedly sends requests to a server at fixed intervals to check for new data.

      // How It Works ?
      // Client → sends a request (e.g., every 5s).
      // Server → replies with data (new or same old).
      // Client waits for the interval, then repeats.
      // In short: Ask → Wait → Ask again → Repeat.

      dispatch(
        addMessage({
          name: generateRandomName(),
          message: "Hello brother",
        })
      );
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {chatMessages.map((chat, index) => (
            <ChatMessage key={index} name={chat.name} message={chat.message} />
          ))}
        </div>
      </div>
      <form
        className="w-full p-2 ml-2 border border-black"
        onSubmit={(e) => {
          console.log("asdsa");
          e.preventDefault();
          dispatch(
            addMessage({
              name: "Amarnath",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="px-2w-96"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-2 bg-green-100">send</button>
      </form>
    </>
  );
};

export default LiveChat;
