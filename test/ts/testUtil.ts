const fs = require('fs');

export const processFileData = (name: string): Array<{
    input: string;
    output: string;
}> => {
    const data = fs.readFileSync(`test/ts/${name}/${name}.txt`, {encoding:'utf8', flag:'r'});
    return data.split('\n').map((splitData: string) => {
        const splitByComma = splitData.split(',');
        return {
            input: splitByComma[0],
            output: splitByComma[1].replace('\r', '')
        };
    });
}