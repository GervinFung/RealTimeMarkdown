import { convertItalic } from './italic';
import { convertLeadingAndTrailingUnderscore } from './underline';
import { convertStrikeThrough } from './strikeThrough';
import { convertBold } from './bold';

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
    const italic = convertItalic(txt);
    const bold = convertBold(italic);
    const underline = convertLeadingAndTrailingUnderscore(bold);
    const strikeThrough = convertStrikeThrough(underline);
    return strikeThrough.replace(NEW_LINE_REG, '<br>');
}