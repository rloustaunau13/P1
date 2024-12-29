import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {  AdminNavBar } from  './AdminNavBar'

import AllReimbursements from './AllReimbursements';
import { NewReimbursement } from './NewReimbursement';
import { ApproveReimbursement } from './ApproveReimbursement';



export default class Admin extends Component {
  render() {
   
        return (

       <>
          
          <div>
          <AdminNavBar/>
            </div>
         
            <div className="d-flex">
       
            <div/>
            
            <AllReimbursements />
         
        
          </div>
          </>
          );
        }
    }