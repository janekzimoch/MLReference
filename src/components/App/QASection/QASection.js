import React from "react";
import { useState } from "react";
import Message from "./message";
import MessageInputField from "./messageInputField";

const SERVER_IP = "";

const default_chat = [
  {
    client: "user",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    paragraphs: [],
  },
  {
    client: "chat",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    paragraphs: [],
  },
  {
    client: "user",
    message: "e 1960s with the release of Letraset sheets containing Lorem Ipsum",
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
      <div className="relative drop-shadow-lg flex grow h-[65%] w-full">
        <div className="absolute text-gray-400 text-xl top-0 -translate-y-1/2 left-14 bg-transparent p-1 font-ligh z-30">
          Q & A chat
        </div>
        <div className="absolute h-[6px] bg-white top-0 -translate-y-1/2 left-12 w-[120px] z-20"></div>
        <div className="bg-prm-white w-full min-h-[200px] rounded-[20px] border-[2px] overflow-hidden border-prm-green z-10">
          <div className="relative h-full max-h-[50%] min-h-[20%] w-full flex-col px-10 py-5">
            {chat.map((msg, i) => (
              <Message msg={msg} key={i} is_last_message={is_last_message(i)} />
            ))}
          </div>
        </div>
      </div>
      <MessageInputField onMessageSent={onMessageSent} />
    </div>
  );
}
