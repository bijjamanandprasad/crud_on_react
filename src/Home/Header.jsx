import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import React,{useState,useEffect} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { getStudentsList } from '../Services/Api';

export default function Header() {

  const [result, setResult] = useState([]);

  useEffect(()=>{
    getStudentsList().then((data)=>{
      setResult(data);
    })
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ALPINE CODE
          </Typography>
          <div className='flex'>
          <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn color"
                    table="table-to-xls"
                    filename="StudentsData"
                    sheet="tablexls"
                    buttonText="Export To Excel"/></div>
                    <table style={{display:'none'}} className="table" id="table-to-xls">
                    <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Id no</th>
                        <th>Gender</th>
                        <th>Branch</th>
                        <th>Contact</th>
                        <th>Year</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                   
                         {result?.map((res)=>
                            <tr>
                            <td>{res.name}</td>
                            <td>{res.idno}</td>
                            <td>{res.gender}</td>
                            <td>{res.branch}</td>
                            <td>{res.contact}</td>
                            <td>{res.year}</td>
                            <td>{res.address}</td>
                            </tr>
                          )}   
                       
                    </tbody>   
                </table>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
