import { convertItalic } from './italic';
import { convertLeadingAndTrailingUnderscore } from './underline';
import { convertStrikeThrough } from './strikeThrough';
import { convertBold } from './bold';
import { convertTable } from './table';
import { convertDiscordSpoilerTag } from './discordSpoilerTag';
import { convertCode } from './code';
import { convertOrderedList } from './orderedList';
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
    const italic = convertItalic(txt.replace(/\r\n/g, '\n'));
    const code = convertCode(italic);
    const bold = convertBold(code);
    const underline = convertLeadingAndTrailingUnderscore(bold);
    const strikeThrough = convertStrikeThrough(underline);
    const discordSpoilerTag = convertDiscordSpoilerTag(strikeThrough);
    const table = convertTable(discordSpoilerTag);
    const orderedList = convertOrderedList(table);
    console.log(orderedList)

    return orderedList.replace(NEW_LINE_REG, '<br>');
}