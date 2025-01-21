import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [form,setForm]=useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  function capValue(){
    // console.log(form);
    axios.post('http://localhost:9000/users/login',form).then((res)=>{
      alert(res.data.message);
      if(res.data.token){
        sessionStorage.setItem('logintoken',res.data.token);
        navigate('/blogs');
      }else{
        navigate('/');
      }
    }).catch((error)=>{
      alert('Invalid Login');
    })
    
  }
  return (
    <div style={{margin:'10%', textAlign:'center'}}>
    <Typography variant='h4' style={{color:'red', fontWeight:'bold'}}>BlogApp Login</Typography>
    <br /><br />
    <div>
    <TextField className="textField" label='Email' variant='outlined' name='email' onChange={(e)=>{
      setForm({...form,email:e.target.value})
    }}></TextField>
    </div>
    <br /><br />
    <div>
    <TextField className="textField" label='password' variant='outlined' name='password' onChange={(e)=>{
      setForm({...form,password:e.target.value})
    }}></TextField>
    </div>
    <br /><br />
    <Button color='error' variant='contained' onClick={capValue}>Login</Button>
    <br /><br />
    <div>
        <Link style={{fontWeight:'bold'}} to={'/signup'}>New user? Please Register here</Link>
    </div>

    </div>
  )
}

export default Login