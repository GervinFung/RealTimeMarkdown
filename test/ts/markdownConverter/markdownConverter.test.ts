import {convertTextToMarkdown} from '../../../src/ts/markdownConverter';
import { processFileData } from '../testUtil';

describe('Test MarkdownConverter Markdown', () => {
    test.each(processFileData('markdownConverter'))(
        'data => %p',
        (data) => {
            expect(convertTextToMarkdown(data.input)).toEqual(data.output);
        }
    );
});