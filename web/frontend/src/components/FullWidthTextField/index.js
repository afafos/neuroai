import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField({label, variant, value, required, onChange}) {
    return (
        <Box
            sx={{
                width: 1200,
                maxWidth: '100%',
            }}
        >
            <TextField fullWidth
                       label={label}
                       id="fullWidth"
                       variant={variant}
                       value={value}
                       required={required}
                       onChange={onChange}/>
        </Box>
    );
}