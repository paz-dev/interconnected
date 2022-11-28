import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import MenuWithAvatar from './MenuWithAvatar';

const optionsMenuCustomer = [
  {
    text: 'My feed',
    href: '/',
    as: '/my-feed',
  },
  {
    text: 'Sign out',
    href: '/logout',
    anchor: true,
  },
];

const optionsMenuAdmin = [
  {
    text: 'Admin',
    href: '/admin',
    as: '/admin',
  },
  {
    text: 'Log out',
    href: '/logout',
    anchor: true,
  },
];

const propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
    isAdmin: PropTypes.bool,
    isGithubConnected: PropTypes.bool,
  }),
  hideHeader: PropTypes.bool,
  redirectUrl: PropTypes.string,
};

const defaultProps = {
  user: null,
  hideHeader: false,
  redirectUrl: '',
};

function Header({ user, hideHeader, redirectUrl }) {
  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        display: 'block',
        top: hideHeader ? '-64px' : '0px',
        transition: 'top 0.5s ease-in',
        backgroundColor: '#24517a',
      }}
    >
      <Toolbar>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item sm={8} xs={7} style={{ textAlign: 'left' }}>
            {user ? null : (
              <Link href="/">
                <Avatar
                  src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                  alt="Interconnected logo"
                  style={{ margin: '0px auto 0px 20px', cursor: 'pointer' }}
                />
              </Link>
            )}
          </Grid>
          <Grid item sm={2} xs={2} style={{ textAlign: 'right' }}>
            {user && user.isAdmin && !user.isGithubConnected ? (
              <Hidden mdDown>
                <a href="/auth/github">
                  <Button variant="contained" color="primary">
                    Connect Github
                  </Button>
                </a>
              </Hidden>
            ) : null}
          </Grid>
          <Grid item sm={2} xs={3} style={{ textAlign: 'right' }}>
            {user ? (
              <div style={{ whiteSpace: ' nowrap' }}>
                {!user.isAdmin ? (
                  <MenuWithAvatar
                    options={optionsMenuCustomer}
                    src={user.avatarUrl}
                    alt={user.displayName}
                  />
                ) : null}
                {user.isAdmin ? (
                  <MenuWithAvatar
                    options={optionsMenuAdmin}
                    src={user.avatarUrl}
                    alt={user.displayName}
                  />
                ) : null}
              </div>
            ) : (
              <Link
                href={{
                  pathname: '/public/login',
                  query: { redirectUrl },
                }}
                as={{
                  pathname: '/login',
                  query: { redirectUrl },
                }}
              >
                <a style={{ margin: '0px 20px 0px auto', color: '#24517a', outline: '0' }}>
                  Welcome
                </a>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
