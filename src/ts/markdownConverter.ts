import { checkAndConvertTextToItalic } from './italic';
import { checkAndConvertTextToUnderline } from './underline';
import { checkAndConvertTextToStrikeThrough } from './strikeThrough';
import { checkAndConvertTextToBold } from './bold';

const NEW_LINE_REG = /\n/g;

export const convertTextToMarkdown = (txt: string): string => {
    if (txt === undefined) {
        throw new Error('txt cannot be undefined');
    }
    if (txt === null) {
        throw new Error('txt cannot be null');
    }
    if (txt.length === 0) {
        return txt;
    }
    const italic = checkAndConvertTextToItalic(txt);
    const bold = checkAndConvertTextToBold(italic);
    const underline = checkAndConvertTextToUnderline(bold);
    const strikeThrough = checkAndConvertTextToStrikeThrough(underline);
    if (strikeThrough.includes('\n')) {
        return strikeThrough.replace(NEW_LINE_REG, '<br>');
    }
    return strikeThrough;
}