import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Reimbursement {
  reimbId: number;
  amount: number;
  description: string;
  status: string;
  user: User; // Nested user object
}
interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: string;
  }

interface JwtPayload {
  userId: string; // Ensure this matches the structure of your JWT payload
  [key: string]: any; // For other fields in the payload
}

const AllReimbursements: React.FC = () => {
    const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to extract userId from JWT
  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem('token');
   
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        console.log(decoded);
        return decoded.sub; // Extract the userId from the payload
      } catch (err) {
        console.error('Invalid JWT:', err);
        return null;
      }
    }
    return null;
  };

 


  const fetchReimbursements = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setError('User not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/auth/reimbursements/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token as a Bearer Token
        }
      });
      console.log(response);
      setReimbursements(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching data.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
      setUserId(id);
    } else {
      setError('Invalid or missing token. Please log in again.');
       // Redirect to the login page
       navigate('/');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchReimbursements();
    }
  }, [userId]);

  return (
    
    <div className="container">
      <h1>Reimbursements</h1>
      <>UserID: </>
       {userId}

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && reimbursements.length === 0 && userId && !error && (
        <p>No pending reimbursements found.</p>
      )}

      {reimbursements.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              
              <th> Reimbursement Id</th>
              <th>User Name</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reimbursements.map((reimbursement) => (
              <tr key={reimbursement.reimbId}>
                <td>{reimbursement.reimbId}</td>
                <td>{reimbursement.user.username}</td>
                <td>{reimbursement.amount}</td>
                <td>{reimbursement.description}</td>
                <td>{reimbursement.status}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllReimbursements;
