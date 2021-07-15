import {combineMultipleStrings, withoutLeadingTrailingWhitespace} from './markdownUtil';

const CODE = /((?:`)[\S\s]*?(?:`))+/gi;

export const convertCode = (unprocessedInput: string): string => {
    return unprocessedInput.replace(CODE, (string, txt): string => {
        const split = string.substring(1, string.length - 1);
        return withoutLeadingTrailingWhitespace(txt) ? combineMultipleStrings('<code class="code-block">', split, '</code>') : string;
    });
};