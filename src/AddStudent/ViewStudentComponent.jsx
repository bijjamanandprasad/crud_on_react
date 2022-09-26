import React from 'react'
import {TextField, Button, Typography,CssBaseline, Paper, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const classes = {
    container:{
        padding:"20px",
        margin:"30px auto"
    },
    title:{
        paddingBottom:'10px',
        width:'40%'
    },
    field:{
        marginBottom:'10px'
    },
    flex:{
        display:'flex',
        width:'100%',

    },
    addBtn:{
        position:' absolute',
        float: 'right',
        top: '39px',
        right: '26px',
        background: '#1976d2',
        padding:' 0 10px',
        borderRadius: '25px',
        height: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

const ViewStudentComponent = ({props, setViewStudent}) => {
    console.log(props)
  return (
    <Box style={{}}>
        <Box style={classes.flex}>
            <Typography style={ classes.title } variant="h6" >Id </Typography>
            <Typography style={ classes.title } variant="h6" >: {props.idno}</Typography>
        </Box>
        <Box style={classes.flex}>
            <Typography style={ classes.title } variant="h6" >Name </Typography>
            <Typography style={ classes.title } variant="h6" >: {props.name}</Typography>
        </Box>
        <Box style={classes.flex}>
            <Typography style={ classes.title } variant="h6" >Contact </Typography>
            <Typography style={ classes.title } variant="h6" >: {props.contact}</Typography>
        </Box>
        <Box style={classes.flex}>
            <Typography style={ classes.title } variant="h6" >Branch </Typography>
            <Typography style={ classes.title } variant="h6" >: {props.branch}</Typography>
        </Box>
        <Box style={classes.flex}>
            <Typography style={ classes.title } variant="h6" >Year </Typography>
            <Typography style={ classes.title } variant="h6" >: {props.year}</Typography>
        </Box>
        <Box style={classes.flex}>
            <Typography style={ classes.title } variant="h6" >Gender </Typography>
            <Typography style={ classes.title } variant="h6" >: {props.gender}</Typography>
        </Box>
        <Box style={classes.flex}>
            <Typography style={ classes.title } variant="h6" >Address </Typography>
            <Typography style={ classes.title } variant="h6" >: {props.address}</Typography>
        </Box>
        
        <div style={{display:'flex',justifyContent:'center'}}>
            <Button variant="contained" style={{background:"orange"}} startIcon={<CloseIcon />} onClick={()=>{setViewStudent(false)}}>Close</Button>
        </div>
            
    </Box>
  )
}

export default ViewStudentComponent;