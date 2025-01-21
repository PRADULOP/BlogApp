import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Addblogs = () => {

  const[blogData,setblogData]= useState({
    title:'',
    description:'',
    image:''
  })

  const navigate= useNavigate();
  const location=useLocation();

  function updateValue(){
  if (location.state!=null) {
    axiosInstance.put('http://localhost:9000/blogs/updateblog/'+location.state.val._id,blogData).then((res)=>{
      alert(res.data);
      navigate('/blogs')
    })
  } else {
    axiosInstance.post('http://localhost:9000/blogs/addblog',blogData).then((res)=>{
      alert(res.data)
      navigate('/blogs')
    }).catch((error)=>{
      alert('Error adding blog')
    })
  }
    
  }

  useEffect(()=>{
    if (location.state!=null) {
      setblogData({...blogData,title:location.state.val.title,
        description:location.state.val.description,
        image:location.state.val.image})
    } else {
      setblogData({...blogData,title:'',
        description:'',
        image:''})
    }
  },[])

  return (
    <div style={{textAlign: 'center',margin:'10%'}}>

  <Grid >
    <Typography variant='h4' style={{color:'red',fontWeight:'bold'}}>ADD NEW BLOG</Typography> <br />
  <Grid >
   <TextField className="textField" label='Title' variant='outlined' name='title' value={blogData.title} onChange={(e)=>{
    setblogData({...blogData,title:e.target.value})
   }}  fullWidth ></TextField>
  </Grid> <br />
  <Grid >
   <TextField className="textField" label='Description' variant='outlined' name='description' value={blogData.description} onChange={(e)=>{
    setblogData({...blogData,description:e.target.value})
   }} fullWidth></TextField>
  </Grid> <br />
  <Grid >
   <TextField className="textField" label='Imageurl' variant='outlined' name='image' value={blogData.image} onChange={(e)=>{
    setblogData({...blogData,image:e.target.value})
   }} fullWidth></TextField>
  </Grid> <br />
  <Grid >
    <Button color='error' variant='contained' onClick={updateValue}>ADD</Button> 
  </Grid>
</Grid>

    </div>
  )
}

export default Addblogs