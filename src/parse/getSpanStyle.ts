import { highlightTree } from '@codemirror/highlight';
import { languages } from '@codemirror/language-data';
import { oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
import type { Language } from '@codemirror/language';
import { Tokens } from '../components/preview/RemarkCode';

const getSpanStyle = ({
    textContent,
    language: { parser },
}: Readonly<{
    textContent: string;
    language: Language;
}>) => {
    const tree = parser.parse(textContent);
    let pos = 0;
    const tokens: Array<Tokens[0]> = [];
    highlightTree(tree, oneDarkHighlightStyle.match, (from, to, classes) => {
        if (from > pos) {
            tokens.push({
                text: textContent.slice(pos, from),
                style: null,
            });
        }
        tokens.push({
            text: textContent.slice(from, to),
            style: classes,
        });
        pos = to;
    });
    if (pos !== tree.length) {
        tokens.push({
            text: textContent.slice(pos, tree.length),
            style: null,
        });
    }
    return tokens as Tokens;
};

const getLanguage = async (languageName: string) =>
    (
        await languages
            .find(({ alias }) => alias.indexOf(languageName) >= 0)
            ?.load()
    )?.language;

export { getLanguage };

export default getSpanStyle;
