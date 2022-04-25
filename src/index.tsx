import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Global, css } from '@emotion/react';

ReactDOM.render(
    <React.StrictMode>
        <>
            <Global
                styles={css`
                    html,
                    body {
                        background-color: transparent;
                        height: 100%;
                    }
                    body {
                        margin: 0;
                        font-family: JetBrains Mono;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    code {
                        font-family: JetBrains Mono;
                    }
                    #root {
                        height: 100%;
                    }
                    * {
                        scrollbar-width: thin;
                        scrollbar-color: gray;
                    }
                    *::-webkit-scrollbar {
                        width: 7px;
                    }
                    *::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    *::-webkit-scrollbar-thumb {
                        background-color: gray;
                    }
                `}
            />
            <App />
        </>
    </React.StrictMode>,
    document.getElementById('root')
);
