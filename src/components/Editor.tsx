import * as React from 'react';
import { css } from '@emotion/css';

const Editor = ({
    text,
    onChange,
}: Readonly<{
    onChange: (text: string) => void;
    text: string;
}>) => {
    return (
        <textarea
            className={css`
                border: 1px solid black;
                width: 100%;
                :focus {
                    outline: none;
                }
            `}
            onChange={({ target: { value } }) => onChange(value)}
        >
            {text}
        </textarea>
    );
};

export default Editor;
