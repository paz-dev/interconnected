import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [username, setUsername] = useState('');
  const [chosenUsername, setChosenUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('messageToBeDisplayed', (msg) => {
      setMessages((currentMessage) => [
        ...currentMessage,
        { author: msg.author, message: msg.message },
      ]);
    });
  };

  const sendMessage = async () => {
    socket.emit('messageToPropogate', { author: chosenUsername, message });
    setMessages((currentMessage) => [...currentMessage, { author: chosenUsername, message }]);
    setMessage('');
  };

  useEffect(() => {
    socketInitializer();
    return () => {
      console.log('');
    };
  }, []);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };
  return (
    <main>
      {!chosenUsername ? (
        <>
          <h1> What is your name?</h1>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button
            type="button"
            onClick={() => {
              setChosenUsername(username);
            }}
          >
            {' '}
            Go!{' '}
          </button>
        </>
      ) : (
        <>
          <p>Your username: {username}</p>
          {messages.map((msg, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                {' '}
                {msg.author} : {msg.message}
              </div>
            );
          })}
          <input
            type="text"
            placeholder="New message.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeypress}
          />
          <button
            type="button"
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </button>
        </>
      )}
    </main>
  );
}
