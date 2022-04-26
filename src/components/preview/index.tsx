import * as React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkReact from 'remark-react';
import RemarkCode from './RemarkCode';
import { defaultSchema } from 'hast-util-sanitize';
import 'github-markdown-css/github-markdown.css';
import { css } from '@emotion/css';

const Preview = ({
    doc,
}: Readonly<{
    doc: string;
}>) => {
    const schema = {
        ...defaultSchema,
        attributes: {
            ...defaultSchema.attributes,
            code: [...(defaultSchema.attributes?.code || []), 'className'],
        },
    };
    const md = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkReact, {
            createElement: React.createElement,
            sanitize: schema,
            remarkReactComponents: {
                code: RemarkCode,
            },
        })
        .processSync(doc).result;

    return (
        <div
            className={`preview markdown-body ${css`
                flex: 0 0 50%;
                padding: 12px;
                box-sizing: border-box;
                overflow: auto;
                color: #abb2bf;
                pre {
                    background-color: rgba(27, 31, 35, 0.45);
                }
            `}`}
        >
            {md}
        </div>
    );
};

export default Preview;
