import {TextField, Typography} from '@mui/material';

function SingleFileUpload({setSingleFile}) {

    const handleFileChange = (event) => {
        setSingleFile(event.target.files[0]);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>Загрузи метадату (.xml)</Typography>
            <TextField
                id="outlined-basic"
                variant="outlined"
                onChange={handleFileChange}
                type="file"
                inputProps={{
                    multiple: false
                }}
            />
        </>
    );
}

function MultipleFileUpload({setFiles}) {

    const handleFilesChange = (event) => {
        setFiles([...event.target.files]);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>Загрузи свои файлы</Typography>
            <TextField
                id="outlined-basic"
                variant="outlined"
                onChange={handleFilesChange}
                type="file"
                inputProps={{
                    multiple: true
                }}
            />
        </>
    );
}

export {SingleFileUpload, MultipleFileUpload};
