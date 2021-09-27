import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  createButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function TopAppBar() {
  let { currentUser, logout } = useAuth()
  const classes = useStyles();
  let history = useHistory();
  const [error, setError] = useState("")

  function handleClickHome() {
    history.push("/");
  }

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Logout Gagal")
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title} onClick={handleClickHome}>
          KARTU KUNJUNGAN
        </Typography>
        {error && alert(error)}
        {currentUser ? (
          <Button variant="contained" color="secondary" onClick={handleLogout} >
            Keluar
          </Button>
        ) : ''}
      </Toolbar>
    </AppBar >
  );
}

export default TopAppBar;