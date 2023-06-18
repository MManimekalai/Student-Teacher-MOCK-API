import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_Link } from '../index';

function TeachersList() {
  const Navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(API_Link);
      if (res.status === 200) {
        setTeachers(res.data);
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

  const handleEdit = (id) => {
    Navigate(`/editstudent/${id}`);
  };

  return (
    <>
      <div
        className="card-container"
        style={{
          backgroundImage: 'url(https://mcarlsonportfolio.files.wordpress.com/2017/04/portfolio-background.jpg?w=1620)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2%',
        }}
      >
        <h1 style={{ color: 'white', textAlign: 'center', paddingBottom: '2%' }}>Here is the Available Teachers List!</h1>

        <div
          className="card-section"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {teachers.map((e) => (
            <Card
              key={e.id}
              className="text-align"
              border="primary"
              style={{
                width: '18rem',
                margin: '10px',
                backgroundImage: 'url(https://tse3.mm.bing.net/th?id=OIF.Ymj0CAQ1RX8djK3OaFwgUg&pid=Api&P=0&h=180)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <Card.Header>
                <h3 className="">{e.TeacherName}</h3>
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
                </div>
                <div className="m-3">
                  <Button variant="primary" onClick={() => handleEdit(e.id)}>
                    <i className="fa-solid fa-pen"></i>
                  </Button>
                  &nbsp; &nbsp;
                  <Button variant="danger" onClick={() => handleDelete(e.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeachersList;
