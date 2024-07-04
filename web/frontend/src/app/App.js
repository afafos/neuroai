import {Route, Routes} from 'react-router-dom'
import UploadFiles from "../pages/UploadFiles";
import ProjectsPage from "../pages/ProjectsPage";
import ExperimentPage from "../pages/ExperimentsPage";
import MetadataPage from "../pages/MetadataPage";
import Header from "../components/Header";

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/upload'} element={<UploadFiles/>}/>
                <Route path={'/projects'} element={<ProjectsPage/>}/>
                <Route path="/projects/:projectId" element={<ExperimentPage/>}/>
                <Route path="/experiments/:experimentId" element={<MetadataPage/>}/>
            </Routes>
        </>
    )
}
export default App;