import React from 'react';
import {Link} from 'react-router-dom';
import {Container, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';


const ProjectList = ({projects}) => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Список проектов</Typography>
            <List>
                {projects.map((project) => (
                    <ListItem key={project.id} component={Link} to={`/projects/${project.id}`}
                              disablePadding>
                        <ListItemButton>
                            <ListItemText primary={project.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ProjectList;
