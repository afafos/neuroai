import React from 'react';
import {Link} from 'react-router-dom';
import {Container, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';


const ExperimentList = ({experiments, project}) => {
    console.log(project.name, project.id)
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Эксперименты проекта {project.name}</Typography>
            <List>
                {experiments.map((experiment) => (
                    <ListItem key={experiment.id} component={Link}
                              to={`/experiments/${experiment.id}`}
                              disablePadding>
                        <ListItemButton>
                            <ListItemText primary={experiment.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ExperimentList;