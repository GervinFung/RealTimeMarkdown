import {combineMultipleStrings, withoutLeadingTrailingWhitespace} from './markdownUtil';
const ANY_ITALIC = /(?:\*){3}([\s\S]+?)(?:\*){3}/gi;

export const convertItalic = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_ITALIC, (string, txt): string => {
        return withoutLeadingTrailingWhitespace(txt) ? combineMultipleStrings('<em>', txt, '</em>') : string;
    });
};