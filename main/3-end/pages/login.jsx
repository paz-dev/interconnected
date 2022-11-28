import Head from 'next/head';
import Button from '@mui/material/Button';

import withAuth from '../lib/withAuth';
import { styleLoginButton } from '../components/SharedStyles';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
    <br /> <br />
    <img
      src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
      alt="Logo"
      style={{ marginRight: '0px', width: '220px', height: 'auto', marginTop: '0px' }}
    />
    <Head>
      <title>Log in to Interconnected</title>
      <meta name="description" content="Login page for interconnected.org" />
    </Head>
    <br />
    <p style={{ margin: '45px auto', fontSize: '35px', fontWeight: '400' }}>Interconnected</p>
    <p>Stay connected with friends and family all over the world.</p>
    <br />
    <Button variant="contained" style={styleLoginButton} href="/auth/google">
      <img
        src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png"
        alt="Google Login"
        style={{ marginRight: '0px', width: '220px', height: 'auto', marginTop: '0px' }}
      />
    </Button>
  </div>
);

export default withAuth(Login, { logoutRequired: true });
