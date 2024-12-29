import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AdminNavBar } from './AdminNavBar';

export const DeleteAUser: React.FC = () => {
  const initialValues = {
    Id: ''
  };

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

      console.log('User deleted successfully:', response.data);

      formikHelpers.resetForm();
    window.location.reload()
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
    
     <AdminNavBar/>
    <div className="col-md-6 mx-auto">
      <h3>Enter User Id</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
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
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};
