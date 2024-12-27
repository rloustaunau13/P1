import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {jwtDecode} from "jwt-decode";

type Props = {};

type State = {
  redirect: string | null;
  username: string;
  password: string;
  loading: boolean;
  message: string;
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      redirect: null,
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      this.setState({ redirect: "/profile" });
    }
  }

  componentWillUnmount() {
    window.location.reload();
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(username, password).then(
      (response) => {
        const token = response; // Assuming response is the JWT token
        
        // Store token in localStorage
        localStorage.setItem("token", token);

        // Decode the JWT to get the role
        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken.role;// Get the role from the token
        console.log(userRole);
        alert(decodedToken)
        // Check the role and set the appropriate redirect
        if (userRole === "manager") {
          this.setState({
            redirect: "/admin", // Redirect to the admin page if the user is a manager
          });
        } else {
          this.setState({
            redirect: "/profile", // Redirect to profile or other page for non-manager
          });
        }
      },
      (error) => {
        this.setState({
          loading: false,
          message: "Invalid username or password",
        });
      }
    );
  }

  render() {
    const { loading, message } = this.state;

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const initialValues = {
      username: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert" style={{ color: "red" }}>
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
        <p>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    );
  }
}
