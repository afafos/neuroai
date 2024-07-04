import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import React from "react";


function ObjectSelect({selectedObject, setSelectedObject, objects}) {

    return (
        <>
            <Typography variant="h6" gutterBottom>Выберите объект эксперимента</Typography>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="object-label" required={true}>Объект эксперимента</InputLabel>
                <Select
                    labelId="object-label"
                    value={selectedObject}
                    onChange={(e) => setSelectedObject(e.target.value)}
                    label="Объект эксперимента"
                >
                    {objects.map((object) => (
                        <MenuItem key={object.id} value={object.id}>
                            {object.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </>
    )
}

export default ObjectSelect