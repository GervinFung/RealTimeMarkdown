import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './css/other/index.css';
import App from './tsx/App';
import reportWebVitals from './reportWebVitals';

const Index = () => {

    const key = 'isLightMode';

    const getIsLightMode = (): boolean => {
        const localStor = localStorage.getItem(key);
        return localStor === null ? false : JSON.parse(localStor);
    };

    const [isLightMode, setIsLightMode] = useState(getIsLightMode());

    const toggleTheme = () => setIsLightMode(!isLightMode);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(isLightMode));
    }, [isLightMode]);

    return (
        <div id='sub-root' className={isLightMode ? 'light-theme' : ''}>
            {<App isLightMode={isLightMode} toggleTheme={toggleTheme}/>}
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();