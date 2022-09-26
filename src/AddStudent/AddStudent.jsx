import React,{useState} from 'react';
import {TextField, Button, Typography,CssBaseline, Paper } from '@mui/material';
import { addStudent } from '../Services/Api';
import { updateStudent } from '../Services/Api';
import { ToastContainer } from "react-toastify";
import { generateError, generateSuccess } from '../Services/Api';

import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const classes = {
    container:{
        padding:"20px",
        margin:"30px auto"
    },
    title:{
        paddingBottom:'10px'
    },
    field:{
        marginBottom:'10px'
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
function Students({props, getAllTheStudents, setOpen, branches}) {

    const typeOfAction = "Add Student Details";

    const [student, setStudent] = useState({
        name: props.name || '',
        idno: props.idno || '',
        contact: props.contact || '',
        gender: props.gender || '',
        year: props.year || '',
        branch: props.branch || '',
        address: props.address || ''
    });

    const clear = () => {
        setStudent({
            name:'',
            idno:'',
            contact:'',
            gender:'',
            year:'',
            branch:'',
            address:''
        });    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addStudent(student)
        .then(data=>{
            setOpen(false)
            generateSuccess(data.name + "is added to studentsList!")
            getAllTheStudents();
        }).catch(err => generateError("Failed to add user"))
        clear();    
    }

    const update = (e) => {
        e.preventDefault();
        updateStudent(props._id,student)
        .then(data=>{console.log(data);
            setOpen(false);
            generateSuccess(data.name + "is updated in studentsList!")
            getAllTheStudents();
        }).catch(err => generateError("Failed to update user"))
        clear();
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setStudent({ ...student, [name]:value });
    }

    const years = ['PUC-1','PUC-2','E1','E2','E3','E4']
    
    return (
        <div>
            <CssBaseline />
                    <form autoComplete="off" noValidate onSubmit={ handleSubmit }>
                        <Typography style={ classes.title } variant="h6" >{typeOfAction}</Typography>
                        <TextField style={ classes.field }  name='name' variant='outlined' label="Name" fullWidth value={student.name} onChange={ handleChange } />
                        <TextField style={ classes.field }  name='idno' variant='outlined' label="ID" fullWidth value={student.idno} onChange={ handleChange } />
                        <TextField style={ classes.field }  name='contact' variant='outlined' label="Contact" fullWidth value={student.contact} onChange={ handleChange } />
                        <TextField style={ classes.field }  name='address' variant='outlined' label="Address" fullWidth value={student.address} onChange={ handleChange } />
                        
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            onChange={handleChange}
                            value={student.gender}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        </FormControl>
                        <Box sx={{ minWidth: 120, marginBottom:'10px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={student.branch}
                                label="branch"
                                name='branch'
                                onChange={handleChange}
                                >
                                {
                                    branches?.map((branch,i) => (
                                        <MenuItem key={i} value={branch}>{branch}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120, marginBottom:'10px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={student.year}
                                label="year"
                                name='year'
                                onChange={handleChange}
                                >
                                {
                                    years?.map((year,i) => (
                                        <MenuItem key={i} value={year}>{year}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        </Box>
                        {(props?.name) && <Button style={ classes.field } variant="contained" color="primary" size="large" onClick={update } fullWidth> Edit Student </Button>}
                        {(!props?.name) && <Button style={ classes.field } variant="contained" color="primary" size="large"  type="submit" fullWidth> Add Student </Button>}
                        <Button style={ classes.field } variant="contained" color="warning" size="small" onClick={ clear } fullWidth> Clear </Button>
                    </form>
                
                <ToastContainer />
        </div>
    );
}

export default Students;