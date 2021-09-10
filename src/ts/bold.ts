import {combineMultipleStrings, withoutLeadingTrailingWhitespace} from './markdownUtil';

const ANY_BOLD = /(?:\*){2}([\s\S]+?)(?:\*){2}/gi;

export const convertBold = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_BOLD, (string, txt): string => {
        return withoutLeadingTrailingWhitespace(txt) ? combineMultipleStrings('<strong>', txt, '</strong>') : string;
    });
};