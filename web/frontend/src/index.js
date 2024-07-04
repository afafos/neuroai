import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
);

// Localhost:
export const mainUrl = `https://uploader.api.neuroai-lab.ru`;

// LMN
// export const mainUrl = `http://192.168.1.43:8020`;
