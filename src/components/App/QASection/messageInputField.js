// components/messageField.js
import React, { useEffect, useRef, useState } from "react";
import sendButton from "../../../../public/send-button.png";
import Image from "next/image";

export default function MessageInputField({ onMessageSent }) {
  const textareaRef = useRef(null);
  const sendButtonRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && event.target === textareaRef.current) {
        if (!event.shiftKey) {
          event.preventDefault(); // Prevent line break in textarea
          sendButtonRef.current.click();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMessageSend = () => {
    if (message.length > 0) {
      onMessageSent(message);
      setMessage("");
    }
  };

  return (
    <div className="absolute bottom-10 drop-shadow-lg flex grow h-[25%] w-full">
      <div className="absolute text-gray-400 text-xl top-0 -translate-y-1/2 left-14 bg-transparent p-1 font-ligh z-30">
        Ask a question
      </div>
      <div className="absolute h-[6px] bg-white top-0 -translate-y-1/2 left-12 w-[160px] z-20"></div>
      <div
        onClick={handleMessageSend}
        className="absolute right-2 bottom-2 z-30 cursor-pointer p-3"
      >
        <Image
          src={sendButton}
          ref={sendButtonRef}
          alt=""
          width={32}
          height={32}
          className="transition-all duration-300 ease-in-out hover:translate-x-1"
        />
      </div>
      <div className="bg-prm-white w-full min-h-[200px] rounded-[20px] border-[2px] overflow-hidden border-prm-green z-10">
        <div className="p-4 pt-6 pr-8 w-full h-full text-gray-400 text-md flex flex-row font-light break-words pl-8">
          <textarea
            name="message"
            placeholder="Type here a conversation like questions about what you would like to learn from the paper... "
            value={message}
            ref={textareaRef}
            onChange={(e) => setMessage(e.target.value)}
            className="no-scrollbar w-full h-full resize-none overflow-auto bg-transparent scrollbar focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
