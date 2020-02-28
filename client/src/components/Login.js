import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () =>
{
  let his = useHistory();

  let [FormData, sFormData] = useState(
    {
      username:"",
      password:"",
      error:""
    });

  let SubmitForm = function()
  {
    Axios.post("http://172.16.42.111:5000/api/login", {username:FormData.username,password:FormData.password}).then((response)=>
    {
      window.localStorage.setItem("atk", response.data.payload);
      his.push("/BubblePage");
    }).catch((error)=>
    {
      sFormData({...FormData, error:error.response.data.error});
    })
  }

  let updateFormData = function(e)
  {
    sFormData({...FormData, [e.target.name]:e.target.value});
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        {FormData.error === "" ? null : FormData.error}
        <form onSubmit={(e)=>{e.preventDefault();SubmitForm();}} onChange={(e)=>{updateFormData(e);}}>
          <input type="text" name="username" placeholder="Username" defaultValue={FormData.username} />
          <input type="password" name="password" placeholder="Password" defaultValue={FormData.password} />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
