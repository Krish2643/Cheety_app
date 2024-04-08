import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css';
import {nanoid} from 'nanoid';
const socket = io.connect("http://localhost:3000");

function App() {

  const [data, setData] = useState('');
  const [chat, setChat] = useState([]);
  

    const Sendchat = (e)=>{
        e.preventDefault();
        socket.emit('chat', {data});
        setData("");
    }

   useEffect(()=>{
        socket.on('chat', (payload)=>{
          setChat([...chat , payload]);
        })
   })

  return (
    <>
      <h1>This is Chat app</h1>

       {chat.map((payload, index)=>{
        return (
              <p key={index}>{payload.data}</p>
          
        )
       })}

        <form onSubmit={Sendchat} >
          <input
           type="text" 
          name="chat"
          placeholder='send text'
          value={data}
          onChange={(e)=> { setData(e.target.value)}}
            />
          <button type='submit'>Send</button>
        </form>
    </>
  )
}

export default App
