import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import
{
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { create } from "./api-user";
import { verifyEmail } from "./api-user";

let enableSignUpButton = false;
let isPasswordValid = false;
let isEmailValid = false;
let validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
  },
  submit: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));


export default function Signup()
{
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    rps: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) =>
  {
    if (name === "email")
    {
      isEmailValid = validateEmail.test(event.target.value);
    }
    else if (name === "password")
    {
      isPasswordValid = validatePassword.test(event.target.value);
    }

    console.log("Email: " + isEmailValid);
    console.log("Password: " + isPasswordValid);

    enableSignUpButton = (isEmailValid && isPasswordValid);
    setValues({ ...values, [name]: event.target.value });
  };

  // this was also giving weird warnings, a solution on the web
  // was to check first if it was being called first [..Jorge]
  const handleClose = () =>
  {
    // if (handleClose)
    // {
    //   handleClose();
    // }
    setOpen(false);
  };

  const clickSubmit = async () =>
  {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      rps: values.rps || undefined,
      elo: values.elo || undefined,
    };

    let emailJson = { email: values.email };
    let emailVerificationResult = await verifyEmail(emailJson);

    if (emailVerificationResult !== null && emailVerificationResult.hasOwnProperty("email"))
    {
      if (values.email === emailVerificationResult.email)
      {
        alert("Email already exists!");
        return;
      }
    }

    enableSignUpButton = false;
    isPasswordValid = false;
    isEmailValid = false;

    create(user).then((data) =>
    {
      if (data.error)
      {
        setValues({ ...values, error: data.error });
      } else
      {
        setOpen(true);
      }
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>

          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            type="password"
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            disabled={!enableSignUpButton}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/Signin">
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Signup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func, // Made it optional to receive less warnings [..Jorge]
};
