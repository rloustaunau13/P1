import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navbar } from './NavBar';

export const NewReimbursement: React.FC = () => {
  const initialValues = {
    amount: '',
    description: '',
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .positive('Amount must be positive')
      .required('Amount is required'),
    description: Yup.string()
      .min(5, 'Description must be at least 5 characters long')
      .required('Description is required'),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
        const token = localStorage.getItem('token'); // Replace with your actual token or fetch it dynamically
      const response = await axios.post(
        'http://localhost:8080/auth/reimbursements',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Reimbursement submitted successfully:', response.data);

      formikHelpers.resetForm();
    window.location.reload()
    } catch (error) {
      console.error('Error submitting reimbursement:', error);
    }
  };

  return (
    <>
    
     <Navbar/>
    <div className="col-md-6 mx-auto">
      <caption>Enter New Reimbursement</caption>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <Field
                name="amount"
                type="number"
                className={`form-control ${
                  errors.amount && touched.amount ? 'is-invalid' : ''
                }`}
              />
              {errors.amount && touched.amount && (
                <div className="invalid-feedback">{errors.amount}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                as="textarea"
                className={`form-control ${
                  errors.description && touched.description ? 'is-invalid' : ''
                }`}
              />
              {errors.description && touched.description && (
                <div className="invalid-feedback">{errors.description}</div>
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
