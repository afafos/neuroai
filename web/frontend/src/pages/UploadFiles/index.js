import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from '@mui/material';
import ParameterDialog from '../../components/ParameterDialog/index';
import ProjectDialog from '../../components/ProjectDialog/index';
import ExperimentDialog from '../../components/ExperimentDialog/index';
import ObjectDialog from '../../components/ObjectDialog/index';
import {MultipleFileUpload, SingleFileUpload} from '../../components/FileUpload/index';
import ParameterSelect from '../../components/ParameterSelect/index';
import ProjectSelect from '../../components/ProjectSelect/index';
import ObjectSelect from "../../components/ObjectSelect";
import ExperimentSelect from "../../components/ExperimentSelect";
import axios from "axios";
import {mainUrl} from "../../index";
import FullWidthTextField from "../../components/FullWidthTextField";
import {Helmet} from "react-helmet";

function UploadFiles() {
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedExperiment, setSelectedExperiment] = useState('');
    const [selectedObject, setSelectedObject] = useState('');
    const [parameterValues, setParameterValues] = useState({});
    const [files, setFiles] = useState([]);
    const [singleFile, setSingleFile] = useState('');
    const [projects, setProjects] = useState([]);
    const [experiments, setExperiments] = useState([]);
    const [objects, setObjects] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [selectedParam, setSelectedParam] = useState([]);
    const [selectedNewExpProjectId, setSelectedNewExpProjectId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [metadata_name, setMetadataName] = useState('');


    useEffect(() => {
        fetch(`${mainUrl}/projects`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })
            .then(response => {
                // Check if response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        fetch(`${mainUrl}/parameters`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                // Check if response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setParameters(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        fetch(`${mainUrl}/objects`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setObjects(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleMetadataNameChange = (event) => {
        setMetadataName(event.target.value);
    };
    const handleSubmit = async (event) => {

            event.preventDefault();

            const formData = new FormData();

            for (const file of files) {
                formData.append('files', file, file.name);
            }

            if (singleFile) {
                formData.append('metadata_file', singleFile, singleFile.name);
            }
            console.log(formData)
            try {
                const uploadResponse = await axios.post(`${mainUrl}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    },
                    params: {
                        metadata_name: metadata_name,
                        experiment_id: selectedExperiment,
                        object_id: selectedObject
                    }
                });

                console.log(uploadResponse)

                if (uploadResponse.status === 200) {
                    console.log('Файлы и данные успешно отправлены на сервер.');
                } else {
                    console.error('Ошибка при отправке файлов и данных на сервер.');
                }
                console.log(parameterValues)

                const metadataId = uploadResponse.data.metadata_id;
                const addParametersData = {
                    metadata_id: metadataId,
                    parameters: parameterValues,
                };
                const addParametersResponse = await axios.post(`${mainUrl}/custom_parameters`, addParametersData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (addParametersResponse.status === 200) {
                    console.log('Параметры успешно добавлены на сервер.');
                } else {
                    console.error('Ошибка при отправке параметров на сервер.');
                }
                window.location.reload()

            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        }
    ;

    return (
        <>
            <Helmet><title>Загрузка файлов</title></Helmet>
            <Container>
                <form onSubmit={handleSubmit}>
                <ProjectSelect
                        projects={projects}
                        setSelectedProject={setSelectedProject}
                        setExperiments={setExperiments}
                        setLoading={setLoading}
                        setError={setError}
                    />
                    <ProjectDialog projects={projects}
                                   setProjects={setProjects}>
                    </ProjectDialog>
                    <ExperimentSelect
                        experiments={experiments}
                        selectedExperiment={selectedExperiment}
                        setSelectedExperiment={setSelectedExperiment}
                    />
                    <ExperimentDialog
                        experiments={experiments}
                        setExperiments={setExperiments}
                        projects={projects}
                        selectedNewExpProjectId={selectedNewExpProjectId}
                        setSelectedNewExpProjectId={setSelectedNewExpProjectId}
                    />
                    <Typography variant="h6" gutterBottom>Введите название опыта</Typography>
                    <FullWidthTextField
                        label="Название опыта"
                        variant="outlined"
                        value={metadata_name}
                        required={true}
                        onChange={handleMetadataNameChange}/>
                    <ObjectSelect
                        selectedObject={selectedObject}
                        setSelectedObject={setSelectedObject}
                        objects={objects}
                    />
                    <ObjectDialog
                        objects={objects}
                        setObjects={setObjects}></ObjectDialog>
                    <ParameterSelect
                        parameters={parameters}
                        selectedParam={selectedParam}
                        setSelectedParam={setSelectedParam}
                        setParameterValues={setParameterValues}
                        parameterValues={parameterValues}
                    />
                    <ParameterDialog
                        parameters={parameters}
                        setParameters={setParameters}/>
                    <SingleFileUpload
                        setSingleFile={setSingleFile}/>
                    <MultipleFileUpload setFiles={setFiles}/>
                    <Container>
                        <Button type="submit">Создать</Button>
                    </Container>
                </form>
            </Container>
        </>
    );
}

export default UploadFiles;
