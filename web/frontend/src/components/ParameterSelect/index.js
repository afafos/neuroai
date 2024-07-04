import {Checkbox, TextField, Typography} from '@mui/material';

function ParameterSelect({
                             selectedParam,
                             parameters,
                             setSelectedParam,
                             setParameterValues,
                             parameterValues
                         }) {

    const handleParameterToggle = (parameter) => {
        if (selectedParam.includes(parameter)) {
            setSelectedParam(selectedParam.filter((p) => p !== parameter));
        } else {
            setSelectedParam([...selectedParam, parameter]);
        }
    };

    const handleParameterValueChange = (parameterName, value) => {
        setParameterValues({...parameterValues, [parameterName]: value});

    };

    return (<>
            <Typography variant="h6" gutterBottom>Выбери необходимые параметры</Typography>
            <ul>
                {parameters.map((parameter) => (
                    <li key={parameter.id}>
                        <label>
                            <Checkbox
                                checked={selectedParam.includes(parameter)}
                                onChange={() => handleParameterToggle(parameter)}
                            />
                            {parameter.name}
                        </label>
                        {selectedParam.includes(parameter) && (
                            <TextField
                                type="text"
                                placeholder={parameter.name}
                                onChange={(e) => handleParameterValueChange(parameter.name, e.target.value)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ParameterSelect;
