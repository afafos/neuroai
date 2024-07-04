import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {mainUrl} from "../../index";

function ObjectDialog({objects, setObjects}) {
    const [newObjectName, setNewObjectName] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewObjectName('');
    };

    const handleCreateObject = async () => {
        try {
            const response = await fetch(`${mainUrl}/add_object`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newObjectName
                })

            });

            if (!response.ok) {
                throw new Error('Ошибка при создании параметра');
            }

            const data = await response.json();

            const newObject = {
                id: data.id,
                name: data.name,
                description: data.description,
                status: data.status
            };
            setObjects([...objects, newObject]);
            handleDialogClose();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <>
            <Button onClick={handleDialogOpen}>Создать новый объект</Button>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Создать новый объект</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название объекта"
                        value={newObjectName}
                        onChange={(e) => setNewObjectName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отмена</Button>
                    <Button onClick={handleCreateObject} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ObjectDialog;
