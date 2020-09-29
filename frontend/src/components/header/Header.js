import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import {LogInLogOutButton} from "../login/Login"
export const Header = ({props,isLoggedIn}) => {
  const visibility = isLoggedIn?'visible':'hidden'
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li style={{visibility:visibility}}>
          <Link to="/addExpense">Add Expense</Link>
        </li>
      </ul>
      <div className="margin">
        <LogInLogOutButton props={props} isLoggedIn={isLoggedIn}/>
      </div>
    </div>
  );
};
