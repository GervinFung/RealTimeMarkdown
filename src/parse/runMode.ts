import { highlightTree } from '@codemirror/highlight';
import { languages } from '@codemirror/language-data';
import { oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
import type { Language } from '@codemirror/language';

const runmode = ({
    textContent,
    language,
    callback,
}: Readonly<{
    textContent: string;
    language: Language;
    callback: (
        text: string,
        style: string | null,
        from: number,
        to: number
    ) => void;
}>) => {
    const tree = language.parser.parse(textContent);
    let pos = 0;
    highlightTree(tree, oneDarkHighlightStyle.match, (from, to, classes) => {
        if (from > pos) {
            callback(textContent.slice(pos, from), null, pos, from);
        }
        callback(textContent.slice(from, to), classes, from, to);
        pos = to;
    });
    if (pos !== tree.length) {
        callback(textContent.slice(pos, tree.length), null, pos, tree.length);
    }
};

const findLanguage = (languageName: string) =>
    languages.find(({ alias }) => alias.indexOf(languageName) >= 0);

const getLanguage = async (
    languageName: string
): Promise<Language | undefined> =>
    (await findLanguage(languageName)?.load())?.language;

export { findLanguage, getLanguage };

export default runmode;
