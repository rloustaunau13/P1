import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {  Navbar } from  './NavBar'

import PendingReimbursements from './PendingReimbursements';
import { NewReimbursement } from './NewReimbursement';


export default class Profile extends Component {
  render() {
   
        return (

       <>
          
          <div>
            <Navbar/>
            </div>
         
            <div className="d-flex">
       
          
            <div/>
            
            <PendingReimbursements />
           
        
          </div>
          </>
          );
        }
    }
  
