import React, {useEffect, useState} from "react";
import ProjectList from "../../components/ProjectList";
import {mainUrl} from "../../index";
import {Helmet} from "react-helmet";

function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


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
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Helmet><title>Список проектов</title></Helmet>
            <ProjectList projects={projects}/>
        </>
    )
}

export default ProjectsPage;