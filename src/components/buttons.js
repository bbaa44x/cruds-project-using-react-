import React, { Component } from "react";
import { Fragment } from "react";
import pic from "./webep/user-solid.svg";
import Table from "./table";
import "animate.css/animate.min.css";
import { json } from "react-router-dom";
import pic2 from "./webep/magnifying-glass-solid.svg";

/////////////////////////////////////////////////////////////

class Buttons extends Component {
  state = {
    user: [],
    ID: 0,
    Editmode: "off",
    create_mod: "off",
    person_i: "",
    person_in: "",
    searchmod:'off'
  };

  handledata = (x, y) => {
    this.state.person_i = x;
    this.state.person_in = y;
    console.log(this.state.person_i, this.state.person_in);
  };
  create = (e) => {
    e.preventDefault();
    const wrapper = document.getElementById("wrapper");
    const table = document.getElementById("table");
    const search_button = document.getElementById("search-button");
    search_button.style.display = "none";
    table.style.display = "none";

    wrapper.style.display = "flex";
    wrapper.style.animationName = "bounceIn";
    wrapper.style.animationDuration = "1s";
    this.setState({
      create_mod: "on",
    });
  };
  handlesubmit = (e) => {
    const date = new Date();
    e.preventDefault();
    const wrapper = document.getElementById("wrapper");
    const name = document.getElementById("name");
    const job = document.getElementById("job");
    const phone = document.getElementById("phone");
    const search_button = document.getElementById("search-button");
    const table = document.getElementById("table");
    
    if (this.state.create_mod == "on") {
      ////////////////dataMangment/////////////////
      let localname = "user" + this.state.ID;
      let obj = {
        user_name: name.value,
        user_phone: phone.value,
        user_job: job.value,
        date: date.toDateString(),
        time: date.toLocaleTimeString(),
        user_id: this.state.ID,
      };

      this.state.user.push(obj);
      localStorage.setItem(localname, JSON.stringify(obj));
      this.setState({
        ID: (this.state.ID += 1),
        create_mod: "off",
      });
      console.log(this.state.ID);
      ///////////////Interface////////////////////
      wrapper.style.animationName = "bounceOut";
      wrapper.style.animationDuration = "1s";
      search_button.style.display='block'
      setTimeout(() => {
        wrapper.style.display = "none";
        name.value = "";
        job.value = "";
        phone.value = "";
        table.style.display = "";
      }, 1000);
      /////////////////////////
    } else {
      this.state.user[this.state.person_in].user_name = name.value;
      this.state.user[this.state.person_in].user_job = job.value;
      this.state.user[this.state.person_in].user_phone = phone.value;
      localStorage.setItem(
        this.state.person_i,
        JSON.stringify(this.state.user[this.state.person_in])
      );

      this.setState({
        Editmode: "on",
      });

      wrapper.style.animationName = "bounceOut";
      wrapper.style.animationDuration = "1s";
      search_button.style.display='block'
      setTimeout(() => {
        wrapper.style.display = "none";
        name.value = "";
        job.value = "";
        phone.value = "";
        table.style.display = "";
        this.setState({
          Editmode: "off",
        });
      }, 1000);
    }
  };

  componentDidMount() {
    if (localStorage.length > 0) {
      const data = [];
      let id = 0;
      for (let i = 0; i < localStorage.length; i++) {
        data.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        data.sort((a, b) => a.user_id - b.user_id);
        id = data[i].user_id;
      }

      id++;

      this.setState({
        user: data,
        ID: id,
      });
    }
  }
search =(e)=>{
  e.preventDefault()
  let search = document.getElementById('search');
  search.style.display = 'block'
  setTimeout(()=>{
    search.focus()
    this.setState({
      searchmod:'on'
    })
  },2000)
}
searchdata = (e)=>{
  let search = document.getElementById('search');
this.state.user.sort((a,b)=>{
  let nameA= a.user_name.toLowerCase();
  let nameB= b.user_name.toLowerCase();
  if(nameA.includes(e.target.value.toLowerCase()))
  {
    return -1;
  }
  if(nameB.includes(e.target.value.toLowerCase()))
  {
    return 1;
  }
  this.setState({
    searchmod:'off'
  })
  setTimeout(()=>{
    search.style.display='none'
  },20000 )
  return 0 ;

})
}
  render() {
    return (
      <Fragment>
        <div className="wrapper">
          <div className="header">
            <p>User Mangement System</p>
          </div>
          <div>
            <form>
              <div id="wrapper" className="create-option">
                <div className="green-div">
                  <p>Enter UserInfo</p>
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    required
                    
                    placeholder="USERNAME"
                  />
                  <input type="text" id="job" required placeholder="Job" />
                  <input type="text" id="phone" required placeholder="Phone" />
                  <div className="button-div" id="submit-idv">
                    <input
                      id="submit"
                      onClick={this.handlesubmit}
                      className="button"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button onClick={this.create}>
                  Create User <img className="user" src={pic} />
                </button>
                <div className="inputs">
                  <button id="search-button" className="search" onClick={this.search} >
                    <img src={pic2} />
                  </button>
                  <input className="search-input" id="search" type="text" onKeyUp={this.searchdata} placeholder="Search By Username" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="table">
          <Table user={this.state.user} senddatatoparent={this.handledata} />
        </div>
      </Fragment>
    );
  }
}

export default Buttons;
