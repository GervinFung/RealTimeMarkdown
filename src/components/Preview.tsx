import * as React from 'react';
import { css } from '@emotion/css';

const Preview = ({
    text,
}: Readonly<{
    text: string;
}>) => {
    return (
        <div
            className={css`
                border: 1px solid black;
                padding: 2px;
                outline: none;
                width: 100%;
            `}
        >
            {text}
        </div>
    );
};

export default Preview;
