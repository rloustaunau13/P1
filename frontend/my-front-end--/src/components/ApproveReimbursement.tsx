import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AdminNavBar } from './AdminNavBar';

export const ApproveReimbursement: React.FC = () => {
    const [reimbursementId, setReimbursementId] = useState<string>('');
  const initialValues = {
    id: '',
    action:'APPROVED'
  };

  const validationSchema = Yup.object({
    id: Yup.number()
      .typeError('Id must be a number')
      .positive('Id must be positive')
      .required('Id is required'),
      action: Yup.string()
      .oneOf(['APPROVED', 'DENIED'], 'Action must be either APPROVED or DENIED')
      .required('Action is required'),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
        const token = localStorage.getItem('token'); // Replace with your actual token or fetch it dynamically
        const body = {
            action: values.action, // Add the "action" field
          };
      const response = await axios.put(
        `http://localhost:8080/auth/reimbursements/${values.id}`, 
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Reimbursement updated successfully:', response.data);

      formikHelpers.resetForm();
    window.location.reload()
    } catch (error) {
      console.error('Error submitting reimbursement:', error);
    }
  };

  return (

    <>
    <AdminNavBar/>
  
    <div className="col-md-6 mx-auto">
      <h3>Approve Reimbursement</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="id">Reimbursement id</label>
              <Field
                name="id"
                type="number"
                className={`form-control ${
                  errors.id && touched.id ? 'is-invalid' : ''
                }`}
              />
              {errors.id && touched.id && (
                <div className="invalid-feedback">{errors.id}</div>
              )}
            </div>

            <div className="form-group">
                <label htmlFor="action">Action</label>
                <Field as="select" name="action" className="form-control">
                  <option value="APPROVED">Approve</option>
                  <option value="DENIED">Deny</option>
                </Field>
                {errors.action && touched.action && (
                  <div className="invalid-feedback">{errors.action}</div>
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
