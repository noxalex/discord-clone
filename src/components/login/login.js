import React from 'react';
import { auth, provider } from '../../firebase';
import { Button } from '@material-ui/core';
import { ReactComponent as DiscordLogo } from './discord_logo.svg';
import './login.css';

function Login() {
  const signIn = () => {
    //login
    auth.signInWithPopup(provider).catch((error) => alert(error));
  };

  return (
    <div className="login">
      <h2>Welcome</h2>

      <div className="login__logo">
        <DiscordLogo />
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
