import * as React from 'react';
import Editor from './components/editor';
import Preview from './components/preview';
import { css } from '@emotion/css';
import Font from './components/common/Font';

const App = () => {
    const [state, setState] = React.useState({
        doc: '# Welcome\n',
    });

    const { doc } = state;

    const handleDocChange = React.useCallback(
        (doc) =>
            setState((prev) => ({
                ...prev,
                doc,
            })),
        []
    );

    return (
        <div
            className={css`
                background-color: transparent;
                display: flex;
                flex-direction: row;
                height: 100%;
            `}
        >
            <Font fontFamily="JetBrains+Mono" />
            <Editor onChange={handleDocChange} initialDoc={doc} />
            <Preview doc={doc} />
        </div>
    );
};

export default App;
