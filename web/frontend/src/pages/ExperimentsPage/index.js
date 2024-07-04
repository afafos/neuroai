import React, {useEffect, useState} from "react";
import ExperimentList from "../../components/ExperimentList";
import {useParams} from "react-router-dom";
import {mainUrl} from "../../index"
import {Helmet} from "react-helmet";

function ExperimentPage() {
    const [experiments, setExperiments] = useState([])
    const {projectId} = useParams();
    const [project, setProject] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [projectName, setProjectName] = useState("")

    useEffect(() => {
        fetch(`${mainUrl}/experiments_by/${projectId}`, {
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
                setExperiments(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        fetch(`${mainUrl}/projects/${projectId}`, {
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
                console.log(data)
                setProject(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        fetch(`${mainUrl}/projects/${projectId}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProjectName(data.name)
            })
            .catch(error => {
                console.error('Error fetching project data:', error);
                setError(error);
                setLoading(false);
            });
    }, [projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Helmet><title>{projectName}</title></Helmet>
            <ExperimentList experiments={experiments}
                            project={project}/>
        </>
    )
}

export default ExperimentPage;