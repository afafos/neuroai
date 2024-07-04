import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

function renderNestedObject(data, level = 0) {
    const tab = '  '; // Два пробела для табуляции
    const indentation = tab.repeat(level);

    return (
        <Box>
            {Object.keys(data).map((key) => (
                <div key={key}>
                    <Typography variant="body2" style={{whiteSpace: 'pre'}}>
                        {indentation}<strong>{key}:</strong> {typeof data[key] === 'object' ? renderNestedObject(data[key], level + 1) : data[key]}
                    </Typography>
                </div>
            ))}
        </Box>
    );
}

function MetadataDialog({open, selectedMetadata, handleClose}) {


    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{selectedMetadata && selectedMetadata.name_metadata}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">S3 path:</Typography>
                    <DialogContentText>
                        {selectedMetadata && selectedMetadata.s3_path}
                    </DialogContentText>
                    <CopyToClipboard text={selectedMetadata && selectedMetadata.s3_path}>
                        <button>Copy</button>
                    </CopyToClipboard>
                </DialogContent>
                <DialogContent>
                    <Typography variant="body1">Custom Parameters:</Typography>
                    {selectedMetadata && selectedMetadata.custom_parameters &&
                        renderNestedObject(selectedMetadata.custom_parameters)}
                </DialogContent>
                <DialogContent>
                    <Typography variant="body1">Microscopy Parameters:</Typography>
                    {selectedMetadata && selectedMetadata.microscopy_parameters &&
                        renderNestedObject(selectedMetadata.microscopy_parameters)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MetadataDialog;