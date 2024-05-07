import React, { Component } from "react";
import { useReducer } from "react";
import { Fragment } from "react";
import "@fontsource/poppins";
import pen from "./webep/pen-solid.svg";
import trash from "./webep/trash-solid.svg";
import "animate.css/animate.min.css";
import App from "../App";
import { json } from "react-router-dom";
import { getValue } from "@testing-library/user-event/dist/utils";

class Table extends Component {
  state = {
    user: this.props.user,
    user_i: "",
    user_in: "",
    deletemod:'off',
  };

  edit = (x, y) => {
    const { user } = this.props;
    let wrapper = document.getElementById("wrapper");
    let name = document.getElementById("name");
    let job = document.getElementById("job");
    let phone = document.getElementById("phone");
    let table = document.getElementById("table");
    const search_button = document.getElementById("search-button");
    const user_id = JSON.parse(JSON.stringify("user" + x));
    const user_indx = JSON.parse(JSON.stringify(y));
    console.log(user_id, user_indx);
    wrapper.style.display = "flex";
    wrapper.style.animationName = "bounceIn";
    wrapper.style.animationDuration = "1s";
    search_button.style.display = "none";
    table.style.display = "none";
    name.value = user[user_indx].user_name;
    job.value = user[user_indx].user_job;
    phone.value = user[user_indx].user_phone;
    this.state.user_i = user_id;
    this.state.user_in = user_indx;
    this.sendData();
  };
  sendData = () => {
    this.props.senddatatoparent(this.state.user_i, this.state.user_in);
  };
  deletedat = (x,y)=>{
    const{user}=this.props
    let delete_user = 'user'+x;
    user.splice(y,1);
    localStorage.removeItem(delete_user)
    this.setState({
      deletemod:'on'
    })
    setTimeout(()=>{
      this.setState({
        deletemod:'off'
      })
    },1000)
  }
  render() {
    const { user } = this.props;

    const show = user.map((users) => {
      return (
        <tr key={users.user_id}>
          <td>{users.user_id}</td>
          <td>{users.user_name}</td>
          <td className="datestring">
            <div>{users.date}</div>
            {users.time}
          </td>
          <td>{users.user_phone}</td>
          <td>
            <button
              onClick={() => {
                this.edit(users.user_id, user.indexOf(users, 0));
              }}
            >
              <img src={pen} />
            </button>
            <button className="trash" onClick={()=>{
              this.deletedat(users.user_id,user.indexOf(users,0))
            }}>
              <img src={trash} />
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>{show}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
