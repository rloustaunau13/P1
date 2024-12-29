
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.component'
import Register from './components/register.component';
import Profile from './components/profile.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './components/Admin.component';
import { ApproveReimbursement } from './components/ApproveReimbursement';
import { NewReimbursement } from './components/NewReimbursement';
import { CreateReimbursementAdmin } from './components/CreateReimbursementAdmin';
import ApprovedReimbursements from './components/ApprovedReimbursements';
import AllReimbursementsUser from './components/AllReimbursementsUser';
import GetAllUsers from './components/GetAllUsers';
import {DeleteAUser} from './components/DeleteAUser';


function App() {
 

  return (
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element= {<Profile />} />
        <Route path="/admin" element= {<Admin/>} />
        <Route path="/new-reimbursement" element= {<NewReimbursement/>} />
        <Route path="/approve-reimbursement" element= {<ApproveReimbursement/>} />
        <Route path="/approvedReimbursements" element= {<ApprovedReimbursements/>} />
        <Route path="/create-reimbursementAdmin" element= {<CreateReimbursementAdmin/>} />
        <Route path="/all-reimbursements-user" element= {<AllReimbursementsUser/>} />
        <Route path="/users" element= {<GetAllUsers/>} />
        <Route path="/delete-user" element= {<DeleteAUser/>} />
      </Routes>
  );
}

export default App
