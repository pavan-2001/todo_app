import React, { useState } from "react";
import firebase from '../functions/firebase';
import {generateUserDocument} from '../functions/api';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
	}
}));


function SignUp(props) {

  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createUserWithEmailAndPasswordHandler = async () => {
    setLoading(true);
    try{
      const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(user);
      generateUserDocument(user,displayName);
      props.setUser(user);
    }
    catch(error){
      setError('Error Signing up with email and password');
      setError(error.message);
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setLoading(false);
  };
  

  return (
    <Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="displayName"
									label="Display Name"
									name="displayName"
									autoComplete="displayName"
                  value={displayName}
									onChange={(e) => setDisplayName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
                  value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={createUserWithEmailAndPasswordHandler}
              disabled={!email || !password || !displayName || loading}
						>
							Sign Up
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
            {error && (
							<Typography variant="body2" className={classes.customError}>
								{error}
							</Typography>
						)}
					</form>
				</div>
			</Container>
  );
};
export default SignUp;