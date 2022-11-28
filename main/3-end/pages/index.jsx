import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import io from 'socket.io-client';
import { AllOutTwoTone } from '@mui/icons-material';
import withAuth from '../lib/withAuth';

let socket;

// import Message from '../server/models/Message';
// const Message = require('../server/models/Message');

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

const Allowance = () => {
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

  useEffect(() => {
    socketInitializer();
    return () => {
      console.log('');
    };
  }, []);

  const sendMessage = async () => {
    socket.emit('messageToPropogate', { author: chosenUsername, message });
    setMessages((currentMessage) => [...currentMessage, { author: chosenUsername, message }]);
    setMessage('');
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };
};
// function send(messageParam) {
//   alert(messageParam);

//   // let idStr;
//   // let email;
//   // let accessToken;
//   // let refreshToken;
//   // let displayNameStr;
//   // let messageSent;

//   // const message = Message.postMessage({
//   //   googleId: idStr,
//   //   email,
//   //   googleToken: { accessToken, refreshToken },
//   //   displayName: displayNameStr,
//   //   messageSent,
//   // });

//   // console.log(message);
// }
// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div style={{ padding: '10px 45px' }}>
        <img
          src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
          alt="Logo"
          style={{ marginRight: '0px', width: '220px', height: 'auto', marginTop: '0px' }}
        />
        <Head>
          <title>Messages</title>
          <meta name="description" content="Your messages" />
        </Head>
        <br />
        <p style={{ fontSize: '30px' }}>
          Welcome back to Interconnected, &nbsp;{user.displayName}!
        </p>
        <>
          <p>Your email (Unique ID): {user.email}</p>
          {/* {Allowance.messages.map((msg, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                {' '}
                {msg.author} : {msg.message}
              </div>
            );
          })} */}
          <input
            type="text"
            placeholder="New message.."
            value={Allowance.message}
            onChange={(e) => Allowance.setMessage(e.target.value)}
            onKeyUp={Allowance.handleKeypress}
          />
          <button
            type="button"
            onClick={() => {
              Allowance.sendMessage();
            }}
          >
            Send
          </button>
        </>
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
