import {Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from '@mui/material';
import {useState} from "react";
import {mainUrl} from "../../index";

function ParameterDialog(props) {
    const [newParameterName, setNewParameterName] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewParameterName('');
    };

    const handleCreateParameter = async () => {
        try {
            const response = await fetch(`${mainUrl}/add_parameter`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name: newParameterName})
                });

            if (!response.ok) {
                throw new Error('Ошибка при создании параметра');
            }

            // Получение данных от бэкенда
            const data = await response.json();

            // Обновление состояния parametersAPI и newParameter
            const newParameter = {
                id: data.id,
                name: data.name,
            };
            props.setParameters([...props.parameters, newParameter]);
            // Обработка создания параметра
            // ...
            handleDialogClose();
        } catch (error) {
            console.error('Ошибка:', error);
            // Обработка ошибки (показать сообщение пользователю и т.д.)
        }
    };

    return (
        <>
            <Button onClick={handleDialogOpen} >Создать новый параметр</Button>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Создать новый параметр</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название параметра"
                        value={newParameterName}
                        onChange={(e) => setNewParameterName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отмена</Button>
                    <Button onClick={handleCreateParameter} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ParameterDialog;
