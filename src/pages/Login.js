import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom"
import { Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(3),
      width: '100%',
    },
  },
}));

const Login = () => {
  const classes = useStyles()
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  if (currentUser) {
    history.push("/")
  };

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch (error) {
      setError('Login Gagal ! Harap masukkan email dan password dengan benar')
    }

    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={4} md={8} xs={10} style={{ margin: 'auto', padding: '3rem 0' }}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1" align="center">Masuk</Typography>
              {error && <div style={{ margin: '1rem 0', color: 'red', }}>{error}</div>}
              <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <div>
                  <TextField name="email" id="email" type="email" label="Email" inputRef={emailRef} required />
                </div>
                <div>
                  <TextField name="password" id="password" type="password" label="Password" inputRef={passwordRef} required />
                </div>
                <Button type="submit" color="primary" variant="contained" disabled={loading}>Masuk</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;