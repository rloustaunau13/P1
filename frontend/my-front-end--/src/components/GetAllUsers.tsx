import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AdminNavBar } from './AdminNavBar';

interface User {
  userId: number;
  firstName: number;
  lastName: string;
  username: string;
  role:string;
}

interface JwtPayload {
  userId: string; // Ensure this matches the structure of your JWT payload
  [key: string]: any; // For other fields in the payload
}

const GetAllUsers: React.FC = () => {
    const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
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

 


  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setError('User not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token as a Bearer Token
        },
        params: { userId },
      });
      console.log(response);
      setUsers(response.data);
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
      fetchUsers();
    }
  }, [userId]);

  return (


    <>
    <AdminNavBar/>
    <div className="container">
      <h1> Users</h1>
  

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && users.length === 0 && userId && !error && (
        <p>No users found.</p>
      )}

      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
           
              <th>User Id</th>
              <th>UserName</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default GetAllUsers;
