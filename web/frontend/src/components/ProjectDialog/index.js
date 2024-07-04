// ProjectDialog.js
import React, {useState} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from '@mui/material';
import {mainUrl} from "../../index";

function ProjectDialog({projects, setProjects}) {
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [newProjectStatus, setNewProjectStatus] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewProjectName('');
        setNewProjectDescription('');
        setNewProjectStatus('');
    };

    const handleCreateProject = async () => {
        try {
            const response = await fetch(`${mainUrl}/add_project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newProjectName,
                    description: newProjectDescription,
                    status: newProjectStatus
                })

            });

            if (!response.ok) {
                throw new Error('Ошибка при создании параметра');
            }

            // Получение данных от бэкенда
            const data = await response.json();

            const newProject = {
                id: data.id,
                name: data.name,
                description: data.description,
                status: data.status
            };
            setProjects([...projects, newProject]);
            handleDialogClose();
        } catch (error) {
            console.error('Ошибка:', error);
            // Обработка ошибки (показать сообщение пользователю и т.д.)
        }
    };

    return (
        <>
            <Button onClick={handleDialogOpen}>Создать новый проект</Button>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Создать новый проект</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название проекта"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Описание проекта"
                        value={newProjectDescription}
                        onChange={(e) => setNewProjectDescription(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Текущий статус проекта"
                        value={newProjectStatus}
                        onChange={(e) => setNewProjectStatus(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отмена</Button>
                    <Button onClick={handleCreateProject} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProjectDialog;
