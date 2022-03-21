import { css } from '@emotion/css';
import * as React from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';

const App = () => {
    const [state, setState] = React.useState({
        text: 'Hello',
    });

    const { text } = state;

    const onChange = (text: string) => {
        setState((prev) => ({
            ...prev,
            text,
        }));
    };

    return (
        <div
            className={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
                height: 100vh;
                font-family: monospace;
                width: 100%;
                box-sizing: border-box;
            `}
        >
            <Editor text={text} onChange={onChange} />
            <Preview text={text} />
        </div>
    );
};

export default App;
