import {combineWords, withoutLeadingTrailingWhitespace} from './markdownUtil';
const ANY_ITALIC: RegExp = /(?:\*){3}([\s\S]+?)(?:\*){3}/g;

export const checkAndConvertTextToItalic = (unprocessedInput: string): string => {
    if (unprocessedInput.includes('***')) {
        return convertItalic(unprocessedInput);
    }
    return unprocessedInput;
}

export const convertItalic = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_ITALIC, (string, txt): string => {
        return withoutLeadingTrailingWhitespace(txt) ? combineWords('<em>', txt, '</em>') : string;
    });
};