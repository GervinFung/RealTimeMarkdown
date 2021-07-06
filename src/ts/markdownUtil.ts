const LEADING_TRAILING_WHITESPACE = /^[ \s]+|[ \s]+$/;

export const combineWords = (leading: string, middle: string, trailing: string): string => {
    return leading + middle + trailing;
}

export const withoutLeadingTrailingWhitespace = (txt: string) => {
    return !LEADING_TRAILING_WHITESPACE.test(txt)
}