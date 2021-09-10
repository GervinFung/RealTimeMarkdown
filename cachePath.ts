import fs from 'fs';
import path from 'path';
// set "isolatedModules": false at tsconfig.json to run this file

const readAllPath = () => {
    const directoryName = '.';
    const allFilesCache = storeAllPath(fs.readdirSync(directoryName), directoryName);
    writeToFile(allFilesCache);
};

const storeAllPath = (fileNames: Array<string>, directoryName: string): any => {
    return fileNames.map((file: string) => {
        if (!file.includes('.git') && file !== 'node_modules' && file !== 'build' && file !== 'test') {
            const filePath = directoryName + '/' + file;
            if (fs.lstatSync(path.resolve(directoryName, file)).isDirectory()) {
                return storeAllPath(fs.readdirSync(filePath), filePath);
            } else {
                return filePath.substring(2);
            }
        }
        return '/';
    })
};

const mapFileToString = (file: Array<string> | string): string => {
    if (Array.isArray(file)) {
        return file.map(files => {
            if (Array.isArray(files)) {
                return mapFileToString(files)
            }
            return `'${files}',\n`;
        }).join('')
    } else {
        return `'${file}',\n`;
    }
}

const writeToFile = (allFilesCache: Array<string>) => {
    const file = fs.createWriteStream('cache.txt');
    file.write(allFilesCache.map((file: Array<string> | string) => mapFileToString(file)).join(''));
    file.end();
};

readAllPath();