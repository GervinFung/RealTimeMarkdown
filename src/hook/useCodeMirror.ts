import * as React from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { history, historyKeymap } from '@codemirror/history';
import { indentOnInput } from '@codemirror/language';
import { bracketMatching } from '@codemirror/matchbrackets';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import {
    defaultHighlightStyle,
    HighlightStyle,
    tags,
} from '@codemirror/highlight';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';

const useCodeMirror = <T extends Element>({
    initialDoc,
    onChange,
}: Readonly<{
    initialDoc: string;
    onChange?: (state: EditorState) => void;
}>): [React.MutableRefObject<T | null>, EditorView?] => {
    const [state, setState] = React.useState({
        editorView: undefined as EditorView | undefined,
    });

    const refContainer = React.useRef<T>(null);
    const { editorView } = state;

    const transparentTheme = EditorView.theme({
        '&': {
            height: '100%',
        },
    });

    const syntaxHighlighting = HighlightStyle.define([
        {
            tag: tags.heading1,
            fontSize: '1.6em',
            fontWeight: 'bold',
        },
        {
            tag: tags.heading2,
            fontSize: '1.4em',
            fontWeight: 'bold',
        },
        {
            tag: tags.heading3,
            fontSize: '1.2em',
            fontWeight: 'bold',
        },
    ]);

    React.useEffect(() => {
        if (!refContainer.current) {
            return;
        }
        const startState = EditorState.create({
            doc: initialDoc,
            extensions: [
                keymap.of([...defaultKeymap, ...historyKeymap]),
                lineNumbers(),
                highlightActiveLineGutter(),
                history(),
                indentOnInput(),
                bracketMatching(),
                defaultHighlightStyle.fallback,
                highlightActiveLine(),
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                    addKeymap: true,
                }),
                oneDark,
                transparentTheme,
                syntaxHighlighting,
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    if (update.changes) {
                        onChange && onChange(update.state);
                    }
                }),
            ],
        });
        const { current } = refContainer;
        if (current) {
            setState((prev) => ({
                ...prev,
                editorView: new EditorView({
                    state: startState,
                    parent: current,
                }),
            }));
        }
    }, [refContainer]);

    return [refContainer, editorView];
};

export default useCodeMirror;
