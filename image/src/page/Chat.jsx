import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./styles/chat.css"
const socket = io.connect("http://localhost:9000");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
 

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const [send , setSend]=useState("")

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    console.log(message , "sender" )
    setSend(message)


  };

  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const receivedMessage = data.message;
      setMessageReceived((prevMessages) => {
        const updatedMessages = [...prevMessages, receivedMessage];
      
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        console.log(updatedMessages , "updatemessages")
        return updatedMessages;
     
      });
    
      console.log(receivedMessage, "receiver");
    });
  }, []);
  
  return (
    <div className="App">

<div className="messageapp">
<h1>sender::{send}</h1>


<center>


  <input type="text"
    placeholder="Room Number..."
    onChange={(event) => {
      setRoom(event.target.value);
    }}
  />

  <button onClick={joinRoom}> Join Room</button>
  <br />
  <input   type="text"
    placeholder="Message..."
    onChange={(event) => {
      setMessage(event.target.value);
    }}
  />
  <button onClick={sendMessage}> Send Message</button>

  </center>
  
<div className="message">

{messageReceived.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    
    </div>
    </div>


    </div>
  );
}

export default App;
