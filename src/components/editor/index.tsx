import * as React from 'react';
import useCodeMirror from '../../hook/useCodeMirror';
import { css } from '@emotion/css';

const Editor = ({
    onChange,
    initialDoc,
}: Readonly<{
    initialDoc: string;
    onChange: (doc: string) => void;
}>) => {
    const [refContainer] = useCodeMirror<HTMLDivElement>({
        initialDoc,
        onChange: React.useCallback(
            ({ doc }) => onChange(doc.toString()),
            [onChange]
        ),
    });

    return (
        <div
            ref={refContainer}
            className={css`
                height: 100%;
                flex: 0 0 50%;
                .cm-scroller {
                    font-family: JetBrains Mono !important;
                }
            `}
        ></div>
    );
};

export default Editor;
