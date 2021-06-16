import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";

function Gameroom({ match, socket }) {
  const gameroomID = match.params.id;
  const [messages, setMessages] = useState([]);
  const [playerID, setPlayerID] = useState("");
  const messageRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("gameroomMessage", {
        gameroomID,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
      messageRef.current.focus();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Auth_token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setPlayerID(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        gameroomID,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          gameroomID,
        });
      }
    };
  }, []);

  return (
    <div className="gameroomPage">
      <div className="gameroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="gameroomContent">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={playerID === message.playerID ? "own" : "message"}
              >
                <span
                  className={
                    playerID === message.playerID
                      ? "ownMessage"
                      : "otherMessage"
                  }
                >
                  {message.name}:{" "}
                </span>
                {message.message}
              </div>
            );
          })}
        </div>
        <div className="gameroomActions">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                ref={messageRef}
                type="text"
                name="message"
                placeholder=" say smt..."
                autoFocus
              />
            </div>
            <div>
              <button onClick={sendMessage} className="join">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Gameroom);
