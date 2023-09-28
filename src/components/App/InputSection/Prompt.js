import React from "react";
import sendButton from "../../../../public/send-button.png";
import Image from "next/image";

export default function Prompt({ prompt, handleInputChange, handlePromptSend }) {
  return (
    <div className="relative drop-shadow-lg flex grow h-full">
      <div className="absolute text-gray-400 text-xl top-0 -translate-y-1/2 left-14 bg-transparent p-1 font-ligh z-30">
        Search query
      </div>
      <div className="absolute h-[6px] bg-white top-0 -translate-y-1/2 left-12 w-[140px] z-20"></div>
      <div onClick={handlePromptSend} className="absolute right-2 bottom-2 z-30 cursor-pointer p-3">
        <Image
          src={sendButton}
          alt=""
          width={32}
          height={32}
          className="transition-all duration-300 ease-in-out hover:translate-x-1"
        />
      </div>
      <div className="bg-prm-white w-full min-h-[200px] rounded-[20px] border-[2px] overflow-hidden border-prm-green z-10">
        <div className="p-4 pt-6 pr-8 w-full h-full text-gray-400 text-md flex flex-row font-light break-words">
          <textarea
            name="prompt"
            placeholder="Describe what you are looking for here... "
            value={prompt}
            onChange={handleInputChange}
            className="no-scrollbar w-full h-full resize-none overflow-auto bg-transparent scrollbar focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
