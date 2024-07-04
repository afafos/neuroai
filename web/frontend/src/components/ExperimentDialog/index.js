// ExperimentDialog.js
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {useState} from "react";
import {mainUrl} from "../../index";

function ExperimentDialog({
                              experiments,
                              setExperiments,
                              projects,
                              selectedNewExpProjectId,
                              setSelectedNewExpProjectId
                          }) {
    const [newExperimentName, setNewExperimentName] = useState('');
    const [newExperimentDescription, setNewExperimentDescription] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewExperimentName('');
        setNewExperimentDescription('');
        setSelectedNewExpProjectId('');
    };

    const handleCreateExperiment = async () => {
        try {
            console.log(selectedNewExpProjectId)
            // Отправка запроса на бэкенд
            const response = await fetch(`${mainUrl}/add_experiment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newExperimentName,
                    description: newExperimentDescription,
                    project_id: selectedNewExpProjectId
                })

            });

            if (!response.ok) {
                throw new Error('Ошибка при создании параметра');
            }

            // Получение данных от бэкенда
            const data = await response.json();

            const newExperiment = {
                id: data.id,
                name: data.name,
                description: data.description,
            };
            setExperiments([...experiments, newExperiment]);

            // Обработка создания эксперимента
            // ...
            handleDialogClose();
        } catch (error) {
            console.error('Ошибка:', error);
            // Обработка ошибки (показать сообщение пользователю и т.д.)
        }
    };

    return (
        <>
            <Button onClick={handleDialogOpen}>Создать новый эксперимент</Button>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Создать новый эксперимент</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название эксперимента"
                        value={newExperimentName}
                        onChange={(e) => setNewExperimentName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Описание эксперимента"
                        value={newExperimentDescription}
                        onChange={(e) => setNewExperimentDescription(e.target.value)}
                        fullWidth
                    />
                    <Typography variant="h6" gutterBottom>Выбери проект</Typography>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="topic-label">Project</InputLabel>
                        <Select
                            labelId="topic-label"
                            value={selectedNewExpProjectId}
                            onChange={(e) => setSelectedNewExpProjectId(e.target.value)}
                            label="Project"
                        >
                            {projects.map((project) => (
                                <MenuItem value={project.id} key={project.id}>
                                    {project.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отмена</Button>
                    <Button onClick={handleCreateExperiment} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ExperimentDialog;
