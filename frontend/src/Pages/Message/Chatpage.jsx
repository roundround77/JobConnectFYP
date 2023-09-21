// Import required styles and components
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import React, { useState, useEffect } from "react";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";

// Initialize an empty array for chat messages
const messagesData = [];

const Chatpage = ({ selected, currentUser }) => {
  // Get authentication information
  const { getToken, user } = AuthUser();

  // Define state variables for message input and chat messages
  const [messageInput, setmessageInput] = useState({
    message: "",
    sentTime: "just now",
    sender: "Ja",
    direction: "outgoing",
  });
  const [messages, setmessages] = useState(messagesData);

  // Handle changes in the message input field
  const handleMessageInput = (e) => {
    setmessageInput({
      message: e,
      sentTime: "just now",
      sender: "Ja",
      direction: "outgoing",
    });
  };

  // Handle sending a message
  const handleSend = () => {
    setmessages([...messages, messageInput]);
    setmessageInput({
      message: "",
      sentTime: "just now",
      sender: "Ja",
      direction: "outgoing",
    });
    sendChatHandler();
  };

  // Send a chat message to the server
  const sendChatHandler = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .post("http://localhost:8000/chat/createMsg/", {
        senderUser: user.id,
        recieverUser: selected.id,
        msg: messageInput.message,
      })
      .then((resp) => {})
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  // Retrieve chat messages between users
  const chatUserHandler = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get("http://localhost:8000/chat/createMsg/")
      .then((resp) => {
        let myMessage = resp.data.data
          .filter((val) => {
            if (
              (val.senderUser === user.id && val.recieverUser === selected.id) ||
              (val.senderUser === selected.id && val.recieverUser === user.id)
            ) {
              return true;
            }
          })
          .map((val) => {
            let data = {
              message: val.msg,
              sentTime: val.created_at,
              sender: "Ja",
              direction: val.senderUser == user.id ? "outgoing" : "incoming",
            };
            return data;
          });
        setmessages(myMessage);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  // Load chat messages when the selected user changes
  useEffect(() => {
    chatUserHandler();
  }, [selected]);

  // Format the chat user's name
  var chatuser = (String(selected.username)).toUpperCase();

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <span>You are chatting with:</span>
      <p style={{ "letterSpacing": "2px", "-webkit-text-stroke": "1px blue", "padding": "0 10px", "display": "inline-block" }}> {chatuser}</p>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message) => (
              <Message model={message} />
            ))}
          </MessageList>

          <MessageInput
            disabled={false}
            attachButton={true}
            value={messageInput.message}
            placeholder="Type message here"
            onChange={(e) => handleMessageInput(e)}
            sendButton={true}
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chatpage;
