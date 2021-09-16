import React from "react";
import { useSignUpPageStyles } from "../styles";
import SEO from "../components/shared/Seo";
import {
  Card,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { LoginWithFacebook } from "./login";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../auth";
import { useForm } from "react-hook-form";
import { HighlightOff, CheckCircleOutline } from "@material-ui/icons";
import isEmail from "validator/lib/isEmail";
import { useApolloClient } from "@apollo/react-hooks";
import { CHECK_IF_USERNAME_TAKEN } from "../graphql/queries";

function SignUpPage() {
  const classes = useSignUpPageStyles();
  const { register, handleSubmit, formState: { errors, touchedFields }, } = useForm({ mode: 'onBlur' });
  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = React.useState("Sign up temporarily disabled");
  // console.log('top error',error);
  // console.log('error message', error.message);
  const client = useApolloClient();

  async function onSubmit(data) {
    // console.log('data',{ data });
    try {
      setError("");
      // console.log('setError', setError)
      await signUpWithEmailAndPassword(data);
      setTimeout(() => history.push("/"), 0);
    } catch (error) {
      console.error("Error signing up", error);
      // setError(error.message);
      handleError(error);
    }
  }

  function handleError(error) {
    if (error.message.includes("users_username_key")) {
      setError("Username already taken");
    } else if (error.code.includes("auth")) {
      setError(error.message);
    }
  }

  async function validateUsername(username) {
    const variables = { username };
    const response = await client.query({
      query: CHECK_IF_USERNAME_TAKEN,
      variables,
    });
    const isUsernameValid = response.data.users.length === 0;
    return isUsernameValid;
  }

  const errorIcon = (
    <InputAdornment>
      <HighlightOff style={{ color: "red", height: 30, width: 30 }} />
    </InputAdornment>
  );

  const validIcon = (
    <InputAdornment>
      <CheckCircleOutline style={{ color: "#ccc", height: 30, width: 30 }} />
    </InputAdornment>
  );

  return (
    <>
      <SEO title="Sign up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook
              color="primary"
              iconColor="white"
              variant="contained"
            />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="email"
                {...register('email', { 
                  required: true, 
                  validate: input => isEmail(input) 
                })}
                InputProps={{
                  endAdornment: errors.email
                    ? errorIcon
                    : touchedFields.email && validIcon,
                }}
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                name="name"
                {...register('name', {
                  required: true,
                  minLength: 5,
                  maxLength: 20
                })}
                InputProps={{
                  endAdornment: errors.name
                    ? errorIcon
                    : touchedFields.name && validIcon,
                }}
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                name="username"
                InputProps={{
                  endAdornment: errors.username
                    ? errorIcon
                    : touchedFields.username && validIcon,
                }}
                {...register('username', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9_.]*$/
                })}
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                {...register('password', {
                  required: true,
                  minLength: 5,
                  validate: async (input) => await validateUsername(input),
                })}
                InputProps={{
                  endAdornment: errors.password
                    ? errorIcon
                    : touchedFields.password && validIcon,
                }}
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
              />
              <Button
                // disabled={ error || !isValid || isSubmitting }
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up 
              </Button>
            </form>
            {/* {error}
            {console.log('error',{error})}
            {!isValid}
            {console.log('isValid',{isValid})}
            {isSubmitting}
            {console.log('isSubmitting',{isSubmitting})} */}
            <AuthError error={error} />
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log in
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export function AuthError({ error }) {
  return (
    Boolean(error) && (
      <Typography
        align="center"
        gutterBottom
        variant="body2"
        style={{ color: "red" }}
      >
        {error}
        {/* {console.log('bottom error',{error})} */}
      </Typography>
    )
  );
}

export default SignUpPage;
