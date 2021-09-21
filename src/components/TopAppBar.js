import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  createButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopAppBar() {
  const classes = useStyles();
  let history = useHistory();

  function handleClickHome() {
    history.push("/");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title} onClick={handleClickHome}>
          Kartu Kunjungan
        </Typography>
      </Toolbar>
    </AppBar>
  );
}