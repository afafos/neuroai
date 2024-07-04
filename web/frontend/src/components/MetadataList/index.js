import React, {useState} from 'react';
import {
    Button,
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import MetadataDialog from "../MetadataDialog";


const MetadataList = ({metadata}) => {
    const [open, setOpen] = useState(false);
    const [selectedMetadata, setSelectedMetadata] = useState(null);

    const handleItemClick = (item) => {
        console.log(item)
        setSelectedMetadata(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Список опытов</Typography>
            <List>
                {metadata.map((meta) => (
                    <ListItem key={meta.id} disablePadding component={Button}
                              onClick={() => handleItemClick(meta)}>
                        <ListItemButton>
                            <ListItemText primary={meta.name_metadata}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <MetadataDialog handleClose={() => handleClose()} selectedMetadata={selectedMetadata}
            open={open}/>
        </Container>
    );
};

export default MetadataList;
