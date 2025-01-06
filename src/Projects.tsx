import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import './Projects.css';
import ItemWindow from "./Window.tsx";
import SectionTitle from "./SectionTitle.tsx";



function GitHubButton({link} : {link : string}) { 
    return (
        <a className="gh_button" href={link}>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="white" width="20px" className="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
            </svg>
        </a>
    )
}



function Tag({tag} : {tag: string}) {
    return (
        <div className="tag">
            {tag}
        </div>
    )
}

function LanguageTags({techstack} : {techstack: string[]}) {
    return (
        <div className="tag-holder">
            { techstack.map((tech, index) => {
                return <Tag tag={tech} />
            })}
        </div>
    )
}


/**
 * Shows a LINUX style window for each card using pure CSS
 * On hover, expand it a little bit, show more interactivity
 * Gif will play on hover. 
 * Tech stack will be tags
 * @param param0 
 * @returns 
 */
function ProjectEntry( {title, techstack, link, gif} : {title: string, techstack: string[], link: string, gif: string}) {
    return (
        <ItemWindow>
        <Card className="card" style={{ width: '18rem' }}>
            <Card.Title>
                {title}
            </Card.Title>
            <Card.Body>
                <Card.Img variant="top" src={gif} />
                <Card.Subtitle>
                    <LanguageTags techstack={techstack} />
                </Card.Subtitle>
                <Button variant="success">
                    Source code
                    <GitHubButton link={link} />
                </Button>

            </Card.Body>
        </Card>
        </ItemWindow>
    )
}


function Projects() {
  return (

    <Container>
        
        <SectionTitle title="Projects" />

        <ProjectEntry title="Packet Sniffer" techstack={["Python"]} 
                       link="" gif="holder.js/100px180" />

        <ProjectEntry title="NES Emulator" techstack={["Java"]} 
                        link="" gif="holder.js/100px180" />

        <ProjectEntry title="Online Chess" techstack={["React", "Typescript", "NodeJS", "ExpressJS"]} 
                        link="" gif="holder.js/100px180" />

    </Container>
  )
}

export default Projects;