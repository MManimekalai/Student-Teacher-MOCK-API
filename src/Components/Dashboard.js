import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { API_Link } from '../index';
import axios from 'axios';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(API_Link);
      if (res.status === 200) {
        setStudents(res.data);
        setTeachers(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const handleAssignStudent = (teacherId, studentId) => {
    const updatedTeachers = teachers.map((teacher) => {
      if (teacher.id === teacherId) {
        const updatedStudents = teacher.students ? [...teacher.students, studentId] : [studentId];
        return {
          ...teacher,
          students: updatedStudents,
        };
      }
      return teacher;
    });
    setTeachers(updatedTeachers);
    handleCloseModal();
  };

  const handleRemoveStudent = (teacherId, studentId) => {
    const updatedTeachers = teachers.map((teacher) => {
      if (teacher.id === teacherId) {
        const updatedStudents = teacher.students.filter((student) => student !== studentId);
        return {
          ...teacher,
          students: updatedStudents,
        };
      }
      return teacher;
    });
    setTeachers(updatedTeachers);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher('');
    setSelectedStudent('');
  };

  const handleOpenModal = (teacherId) => {
    setSelectedTeacher(teacherId);
    setShowModal(true);
  };

  const getAssignedStudentCount = (teacherId) => {
    const teacher = teachers.find((teacher) => teacher.id === teacherId);
    return teacher && teacher.students ? teacher.students.length : 0;
  };

  return (
    <>
    <div style={{ backgroundImage: 'url(https://sassysue212blog.files.wordpress.com/2016/03/portfolio-background.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100%', height: '100%' }}>
      <h1 style={{color:"white", textAlign:"center", padding:"2%"}}>Welcome to Student-Teacher Dashboard!</h1>
      <div className="card-container" >
        {teachers.map((e) => (
          <Card
            className="text-align"
            border="white"
            style={{ width: '18rem', flexBasis: '30%', marginBottom: '30px', backgroundImage: 'url(https://wallpaperaccess.com/full/5652000.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
            key={e.id}
            text='white'
            >
            <Card.Header>
              <h3>{e.TeacherName}</h3>
            </Card.Header>
            <Card.Body>
              <div className="contents">
                <Card.Text>
                  <b>Email: </b>
                  {e.EmailID}
                </Card.Text>
                <Card.Text>
                  <b>Mobile: </b>
                  {e.MobileNumber}
                </Card.Text>
                <Card.Text>
                  <b>Expert in: </b>
                  {e.Course}
                </Card.Text>
                <Card.Text>
                  <b>No. of students assigned: </b>
                  {getAssignedStudentCount(e.id)}
                </Card.Text>
              </div>
              <div className="m-3">
                <Button variant="primary" onClick={() => handleOpenModal(e.id)}>
                  Assign Student
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="danger"
                  onClick={() => handleRemoveStudent(e.id, selectedStudent)}
                  disabled={!selectedStudent}
                >
                  Remove Student
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Student to Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectStudent">
            <Form.Label>Select a student:</Form.Label>
            <Form.Control
              as="select"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">-- Select a student --</option>
              {students.map((student) => (
                <option value={student.id} key={student.id}>
                  {student.StudentName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAssignStudent(selectedTeacher, selectedStudent)}
            disabled={!selectedStudent}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default Dashboard;
