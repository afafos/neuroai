import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {mainUrl} from "../../index";


function ProjectSelect({
                           projects,
                           selectedProject,
                           setSelectedProject,
                           setExperiments,
                           setLoading,
                           setError
                       }) {
    const handleProject = (event) => {
        setSelectedProject(event.target.value);

        fetch(`${mainUrl}/experiments_by/${event.target.value}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                // Check if response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setExperiments(data);
                setLoading(false);
                console.log(data)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    };
    return (
        <>
            <Typography variant="h6" gutterBottom>Выбери проект</Typography>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="project-label" required={true}>Проект</InputLabel>
                <Select
                    labelId="project-label"
                    value={selectedProject}
                    onChange={handleProject}
                    label="Project"
                >
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                            {project.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )

}
export default ProjectSelect;