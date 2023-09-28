import React from "react";
import { useState } from "react";
import Message from "./message";
import MessageInputField from "./messageInputField";

const SERVER_IP = "";

const default_chat = [
  {
    client: "user",
    message: "test",
    paragraphs: [],
  },
  {
    client: "user",
    message: "test",
    paragraphs: [],
  },
];

export default function QASection() {
  const [chat, setChat] = useState(default_chat);
  const [bearerToken, setBearerToken] = useState(null);

  // useEffect(() => {
  //   const userAuth = JSON.parse(
  //     window.localStorage.getItem(
  //       `sb-${process.env.NEXT_PUBLIC_DB_SUPABASE_URL_CORE}-auth-token`
  //     )
  //   );
  //   const user_token = userAuth.access_token;
  //   setBearerToken("Bearer " + user_token);
  // }, []);

  async function onMessageSent(text) {
    const usr_msg = {
      client: "user",
      message: text,
      paragraphs: [],
    };
    setChat((chat) => [...chat, usr_msg]);
    // const chat_msg = await fetch(`${SERVER_IP}/api/message`, {
    //   method: "POST",
    //   body: JSON.stringify(usr_msg),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: bearerToken,
    //   },
    // }).then((response) => response.json());
    const bot_msg = {
      client: "gpt",
      message: text,
      paragraphs: [],
    };
    setChat((chat) => [...chat, chat_msg]);
  }

  function is_last_message(i) {
    const current_msg = chat[i];
    if (i + 1 < chat.length) {
      const next_msg = chat[i + 1];
      if (current_msg.client === next_msg.client) {
        return false;
      }
    }
    return true;
  }

  console.log(chat);

  return (
    <div className="relative mx-auto h-full">
      <div className="h-[50%] w-full items-center overflow-auto rounded-2xl bg-gray-100 bg-opacity-50 scrollbar">
        <div className="relative h-full max-h-[50%] min-h-[20%] w-full flex-col px-10 py-5">
          {chat.map((msg, i) => (
            <Message msg={msg} key={i} is_last_message={is_last_message(i)} />
          ))}
        </div>
      </div>
      <div className="relative mx-6 mb-8 mt-6 border-t-2 bg-gray-100 opacity-30"></div>
      <MessageInputField onMessageSent={onMessageSent} />
    </div>
  );
}
