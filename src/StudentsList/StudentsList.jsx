import React,{useState,useEffect} from 'react';
import { getStudentsList, viewStudent, deleteStudent, updateStudent, generateError, generateSuccess } from '../Services/Api';
import { Link,useNavigate} from 'react-router-dom';
import { Button, CardContent, Box } from '@mui/material';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import AddStudent from "../AddStudent/AddStudent"
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer } from "react-toastify";

import  ViewStudentComponent from '../AddStudent/ViewStudentComponent';

import { searchData, searchByBranch,getBranchesList} from '../Services/Api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3587d7",
    color: theme.palette.common.white,
    fontSize:'18px',
    fontWeight:'700'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const ListCompenent = ({data, setViewStudent,setOpen,setStudent,getAllTheStudents}) => {
    const id = data._id;
    const l = data;
    const navigate = useNavigate();
    const view = () => {
        // navigate(`/student/${id}`)
        setViewStudent(true);
        setStudent(data);

    }
    const update = () => {
        setStudent(data)
        setOpen(true)
    }
    const remove = () => {
        deleteStudent(id).then(data => {
            generateSuccess(data.name + 'is deleted successfully!')
            getAllTheStudents();
        }).catch(err => generateError('Failed to delete user!'));
    }
    return (
        <>
            <StyledTableCell component="th" scope="row">{l.idno}</StyledTableCell>
            <StyledTableCell align="left">{l.name}</StyledTableCell>
            <StyledTableCell align="left">{l.contact}</StyledTableCell>
            <StyledTableCell align="left">{l.branch}</StyledTableCell>
            <StyledTableCell align="left">{l.year}</StyledTableCell>
            <StyledTableCell align="left">{l.gender}</StyledTableCell>
            <StyledTableCell align="left">{l.address}</StyledTableCell>
            <StyledTableCell align="left">
            <IconButton color="primary" onClick={view}>
                <VisibilityIcon />
            </IconButton>
            <IconButton color="warning" onClick={update}>
                
                <DriveFileRenameOutlineIcon />
            </IconButton>
            <IconButton color="error" onClick={remove}>
                
                <DeleteIcon />
            </IconButton>
                {/* <Button variant='contained' color="primary" onClick={view}>View</Button>
                <Button variant='contained' color="warning" onClick={update}>Edit</Button>
                <Button variant='outlined' color="error" onClick={remove}>Delete</Button> */}
            </StyledTableCell>        
        </>
    )
}

function StudentsList(props) {
    const [list, setList] = useState([]);
    const [student, setStudent] = useState({});
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [branchByFilter, setBranchByFilter] = useState('');
    const [branches, setBranches] = useState([]);
    const [viewStudent, setViewStudent] = useState(false);

    const getAllTheStudents = () => {
        getStudentsList().then((data)=>{
            if(data){
                setList(data.reverse());
                return data;
            }
        }).then(data => console.log(data));
    }

 
    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
        if(value == '') getAllTheStudents();
        else{
            searchData(value).then(data => {
                // setFilterList(data)
                setList(data)
            })
        }
        
    }
    const handleChange = (e) => {
        const {value} = e.target;
        setBranchByFilter(value)
        if(value == "select branch") getAllTheStudents();
        else{
            searchByBranch(value).then(data => {
                // setFilterList(data)
                setList(data)
            })
        }

    }

    useEffect(()=>{
        getBranchesList().then(data => {
            setBranches(data.map(d => d.branch));
            return data;
        }).then(data => console.log(data));
        getAllTheStudents();
    },[]);

    


    return (
        <>
        <Box sx={{ minWidth: 200, marginBottom:'10px', display:'flex',justifyContent:'flex-end' }}>
            <div style={{display:'flex',justifyContent:'flex-end',padding:'10px'}}>
                <TextField label="Search" fullWidth value={search} onChange={ handleSearch } />
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',padding:'10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">BranchFilter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={branchByFilter}
                        label="Branch"
                        name='branch'
                        onChange={handleChange}
                        style={{width: '152px'}}
                        >
                        <MenuItem value="select branch" selected>Select Branch</MenuItem>
                        {
                            branches?.map((branch,i) => (
                                <MenuItem key={i} value={branch}>{branch}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',padding:'20px'}}>
                <Button variant="contained" color='primary' onClick={()=>{setOpen(!open); setStudent({})}}>Add Student</Button>
            </div> 
        </Box>
            <Modal isOpen={open} toggle={() => setOpen(!open)}>
                {/* <ModalHeader>
                    Student Data
                </ModalHeader> */}
                <ModalBody>
                    <AddStudent branches={branches} setOpen={setOpen} getAllTheStudents={getAllTheStudents} props={student} />
                </ModalBody>
            </Modal>

            <Modal isOpen={viewStudent} toggle={() => setViewStudent(!viewStudent)}>
                <ModalHeader style={{background:"orange",color:"white"}}>
                    Student Information
                </ModalHeader>
                <ModalBody>
                    <ViewStudentComponent props={student} setViewStudent={setViewStudent}/>
                </ModalBody>
            </Modal>

                   

        <Card >
            <CardContent>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow >
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Contact</StyledTableCell>
                    <StyledTableCell align="left">Branch</StyledTableCell>
                    <StyledTableCell align="left">Year</StyledTableCell>
                    <StyledTableCell align="left">Gender</StyledTableCell>
                    <StyledTableCell align="left">Address</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {list?.map((l,index)=>(
                        <StyledTableRow key={index}>
                            <ListCompenent setViewStudent={setViewStudent} getAllTheStudents={getAllTheStudents} setOpen={setOpen} setStudent={setStudent} data={l} />
                        </StyledTableRow>
                    ))}
                    {
                        !list.length && <h5> Not found </h5>
                    }
                </TableBody>
            </Table>
            </TableContainer>

        </CardContent>
        </Card>

        <ToastContainer />
        </>
    );
}

export default StudentsList;