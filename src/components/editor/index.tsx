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
    const handleChange = React.useCallback(
        ({ doc }) => onChange(doc.toString()),
        [onChange]
    );

    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
        initialDoc: initialDoc,
        onChange: handleChange,
    });

    React.useEffect(() => {
        if (editorView) {
            console.log("let's begin");
        }
    }, [editorView]);

    return (
        <div
            ref={refContainer}
            className={css`
                height: 100%;
                flex: 0 0 50%;
                font-family: JetBrains Mono !important;
                .cm-scroller {
                    font-family: JetBrains Mono !important;
                }
            `}
        ></div>
    );
};

export default Editor;
