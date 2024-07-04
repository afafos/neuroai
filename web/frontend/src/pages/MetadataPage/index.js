import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MetadataList from "../../components/MetadataList";
import {mainUrl} from "../../index";
import {Helmet} from "react-helmet";

function MetadataPage() {
    const [metadata, setMetadata] = useState([])
    const {experimentId} = useParams();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [experimentName, setExperimentName] = useState("")

    useEffect(() => {
        fetch(`${mainUrl}/metadata/?experiment_id=${experimentId}`, {
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
                setMetadata(data);
                setLoading(false);
                console.log(data)
                console.log(experimentId)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        fetch(`${mainUrl}/experiment/${experimentId}`, {
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
                setExperimentName(data.name)
            })
            .catch(error => {
                console.error('Error fetching experiment data:', error);
                setError(error);
                setLoading(false);
            });
    }, [experimentId]);

    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Helmet><title>{experimentName}</title></Helmet>
            <MetadataList metadata={metadata}/>
        </>
    )
}

export default MetadataPage;