import axios from "axios";
import { toast } from "react-toastify";

const URL = "http://localhost:5000";

export const addStudent = async (value) => {
    try{
        const {data} = await axios.post(URL+"/student",value);
        return data;
    }catch(error){
        console.log(error + "Error while adding the Student!!!");
    }
}

export const getStudentsList = async () => {
    try{
        const {data} = await axios.get(URL+"/");
        return data;
    }catch(error){
        console.log(error + "Error while fetching the students list!!!");
    }
}
export const searchData = async (value) => {
    try{
        const {data} = await axios.get(URL+"/search?query="+value);
        return data;
    }catch(error){
        console.log(error + "Error while the searching the user!!!");
    }
}
export const searchByBranch = async (value) => {
    try{
        const {data} = await axios.get(URL+"/branch?query="+value);
        return data;
    }catch(error){
        console.log(error + "Error while searching by branch!");
    }
}
export const getBranchesList = async () => {
    try{
        const {data} = await axios.get(URL+"/branchList");
        return data;
    }catch(error){
        console.log(error + "Error while fetching the branch list!");
    }
}

export const viewStudent = async (id) => {
    try{
        const {data} = await axios.get(URL+`/${id}`)
        return data;
    }catch(error){
        console.log(error + "Error while fetching the single student details!!!");
    }
}
export const updateStudent = async (id,value) => {
    try{
        const {data} = await axios.put(URL+`/${id}`,value)
        return data;
    }catch(error){
        console.log(error + "Error while updating the student!!!");
    }
}
export const deleteStudent = async (id) => {
    try{
        const {data} = await axios.delete(URL+`/${id}`)
        return data;
    }catch(error){
        console.log(error + "Error while deleting the student!!!");
    }
}

export const generateError = (error) =>
toast.error(error, {
  position: "bottom-right",
  closeOnClick: true,
});
export const generateSuccess = (error) =>
toast.success(error, {
  position: "bottom-right",
  closeOnClick: true,
});
