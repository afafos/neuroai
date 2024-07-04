import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import React from "react";

function ExperimentSelect({experiments, selectedExperiment, setSelectedExperiment}) {


    return (
        <>
            <Typography variant="h6" gutterBottom>Выбери эксперимент</Typography>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="experiment-label" required={true}>Эксперимент</InputLabel>
                <Select
                    labelId="experiment-label"
                    value={selectedExperiment}
                    onChange={(e) => setSelectedExperiment(e.target.value)}
                    label="Experiment"
                >
                    {experiments.map((exp) => (
                        <MenuItem key={exp.id} value={exp.id}>
                            {exp.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default ExperimentSelect