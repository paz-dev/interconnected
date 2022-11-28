import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withAuth from '../lib/withAuth';

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

function send(messageParam) {
  alert(messageParam);

  // let idStr;
  // let email;
  // let accessToken;
  // let refreshToken;
  // let displayNameStr;
  // let messageSent;

  // const message = Message.postMessage({
  //   googleId: idStr,
  //   email,
  //   googleToken: { accessToken, refreshToken },
  //   displayName: displayNameStr,
  //   messageSent,
  // });

  // console.log(message);
}
// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  render() {
    const { user } = this.props;
    // useEffect(() => {
    //   socketInitializer();
    //   return () => {
    //     console.log('');
    //   };
    // }, []);
    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Messages</title>
          <meta name="description" content="Your messages" />
        </Head>
        <br />
        <p style={{ fontSize: '30px' }}>
          Welcome back to Interconnected, &nbsp;{user.displayName}!
        </p>

        <p>Your Feed:</p>
        {/* <br /> <br />
        <br /> <br />
        <br /> <br />
        <br /> <br /> */}
        <textarea
          name="textarea"
          style={{ background: '#24517a', color: 'white' }}
          rows="50"
          cols="70"
          defaultValue="There seems to be nothing on your feed yet!"
        />
        <div className="input-container">
          <input
            style={{ height: '40px', width: '475px' }}
            type="text"
            id="messageId"
            className="input-field"
          />
          <button
            type="button"
            className="input-button"
            style={{ height: '40px' }}
            onClick={() => send(document.getElementById('messageId').value)}
          >
            {' '}
            Post message{' '}
          </button>
        </div>
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
