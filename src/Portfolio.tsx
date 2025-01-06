import React from 'react';
import ToolBar from './Toolbar';
import Projects from './Projects';
import Background from './Background';
import { Container } from 'react-bootstrap';
import HireMe from './Hireme';


function Portfolio() {
  return (
    
    <>
      <Background />
      <ToolBar />
      <Container style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 1)", marginTop: "-55px", paddingTop: "55px"}}>
        <HireMe />
        
        <Projects />
      </Container>
    </>
  )
} 

export default Portfolio;