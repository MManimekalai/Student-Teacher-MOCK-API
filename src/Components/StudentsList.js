import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { API_Link } from '../index';
import axios from 'axios';



function StudentsList() {
  const [students, setStudents] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(API_Link);
      if (res.status === 200) {
        setStudents(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_Link}/${id}`);
      if (res.status === 200) {
        getData();
      }
    } catch (error) {
      alert(error);
    }
  };

  const navigate = useNavigate();

  const editStudent = (id) => {
    navigate(`/edit-student/${id}`);
  };

  
  return (
    <>
    <div className="container-fluid" style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/5652030.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100%', height: '100%' }}>
    <h1 style={{color:"white", textAlign:"center", padding:"2%"}}>Welcome to Available Students List!</h1>
      <Table bordered style={{color:'white'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((e) => (
            <tr key={e.id}>
              <td>{e.StudentName}</td>
              <td>{e.EmailID}</td>
              <td>{e.MobileNumber}</td>
              <td>{e.Course}</td>
              <td>
                <Button variant="primary" onClick={() => editStudent(e.id)}>
                  Edit
                </Button>&nbsp;&nbsp;
                <Button variant="danger" onClick={() => handleDelete(e.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
      <Button variant="success" onClick={() => navigate('/addstudent')}>
        Add New Student
      </Button>
      </div>
    </>
  );
 }


export default StudentsList;
