import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AdminNavBar } from './AdminNavBar';

export const DeleteAUser: React.FC = () => {
  const initialValues = {
    Id: ''
  };
  const [message, setMessage] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean>(false);

  type State = {
    successful: boolean;
    message: string;
  }

  const validationSchema = Yup.object({
    Id: Yup.number()
      .typeError('Id must be a number')
      .positive('Id must be positive')
      .required('Id is required'),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
        const token = localStorage.getItem('token'); // Replace with your actual token or fetch it dynamically
      const response = await axios.delete(
        `http://localhost:8080/auth/users/${values.Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

    setMessage("User deleted successfully.")
    setSuccessful(true);
      console.log('User deleted successfully:', response.data);

      formikHelpers.resetForm();
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('failed to delete USer');
      setSuccessful(false);
    }
  };

  return (
    <>
    
     <AdminNavBar/>
    <div className="col-md-6 mx-auto">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <legend className="text-center">Delete User</legend>
            <div className="form-group">
              <label htmlFor="Id">Id</label>
              <Field
                name="Id"
                type="number"
                className={`form-control ${
                  errors.Id && touched.Id ? 'is-invalid' : ''
                }`}
              />
              {errors.Id && touched.Id && (
                <div className="invalid-feedback">{errors.Id}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>


            
            {message && (
                <div className="form-group mt-3">
                  <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                    {message}
                  </div>
                </div>
              )}
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};
