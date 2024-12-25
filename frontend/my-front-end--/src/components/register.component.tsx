import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

type Props = {};

type State = {
  username: string,
  first_name: string,
  last_name:string,
  redirect:string,
  password: string,
  successful: boolean,
  message: string
};



export default class Register extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.handleRegister = this.handleRegister.bind(this);
  
      this.state = {
        username: "",
        first_name: "",
        last_name:"",
        redirect:"",
        password: "",
        successful: false,
        message: ""
      };
    }
  
    validationSchema() {
      return Yup.object().shape({
        username: Yup.string()
          .test(
            "len",
            "The username must be between 3 and 20 characters.",
            (val: any) =>
              val &&
              val.toString().length >= 3 &&
              val.toString().length <= 20
          )
          .required("This field is required!"),
        first_name: Yup.string()
         .test(
            "len",
            "First name is required",
            (val:any)=>
                val&&
            val.toString().length>=1 &&
            val.toString().length<=20
         )
         .required("This field is required!"),
         last_name: Yup.string()
          .test(
             "len",
             "Last name is required",
             (val:any)=>
                 val&&
             val.toString().length>=1 &&
             val.toString().length<=20
          )
          .required("This field is required!"),
        password: Yup.string()
          .test(
            "len",
            "The password must be between 6 and 40 characters.",
            (val: any) =>
              val &&
              val.toString().length >= 6 &&
              val.toString().length <= 40
          )
          .required("This field is required!"),
      });
    }
  
    handleRegister(formValue: { username: string; first_name: string; last_name:string, password: string }) {
      const {  first_name, last_name,username,password} = formValue;
  
      this.setState({
        message: "",
        successful: false
      });
  
      AuthService.register(
        first_name,
        last_name,
        username,
        password,
       
      ).then(
        response => {
          this.setState({
            redirect: "/profile",
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          this.setState({
            successful: false,
            message: 'Username already Exists'
          });
        }
      );
    }



     componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
    
        if (currentUser) {
          this.setState({ redirect: "/profile" });
        };
      }
    
      componentWillUnmount() {
        window.location.reload();
      }
    
  
    render() {
      const { successful, message } = this.state;
  
      if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
      }
      const initialValues = {
        username: "",
        first_name: "",
        last_name: "",
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
              onSubmit={this.handleRegister}
            >
              <Form>
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username"> Username </label>
                      <Field name="username" type="text" className="form-control" />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
  
                    <div className="form-group">
                      <label htmlFor="first_name"> First name </label>
                      <Field name="first_name" type="first_name" className="form-control" />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="last_name"> Last name </label>
                      <Field name="last_name" type="last_name" className="form-control" />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
  
                    <div className="form-group">
                      <label htmlFor="password"> Password </label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
  
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
                )}
  
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
            <p>
            
            Already have an account? <Link to="/">Log in</Link>
          </p>
          </div>
        </div>
      );
    }
  }