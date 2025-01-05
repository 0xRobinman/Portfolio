import React from 'react';
import ToolBar from './Toolbar';
import Projects from './Projects';
import Background from './Background';
import { Container } from 'react-bootstrap';


function Portfolio() {
  return (
    
    <>
      <Background />
      <ToolBar />
      <Container style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 1)"}}>
        <Projects />
      </Container>
    </>
  )
} 

export default Portfolio;