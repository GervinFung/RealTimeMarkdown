import {combineWords, withoutLeadingTrailingWhitespace} from './markdownUtil';

const ANY_BOLD: RegExp = /(?:\*){2}([\s\S]+?)(?:\*){2}/g;

export const convertBold = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_BOLD, (string, txt): string => {
        return withoutLeadingTrailingWhitespace(txt) ? combineWords('<strong>', txt, '</strong>') : string;
    });
};