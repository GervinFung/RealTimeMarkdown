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
}>) => (
    <div
        className={`preview markdown-body ${css`
            flex: 0 0 50%;
            padding: 0 16px;
            box-sizing: border-box;
            overflow: auto;
            color: #abb2bf;
            font-family: JetBrains Mono !important;
            pre {
                background-color: rgba(27, 31, 35, 0.45);
                font-family: JetBrains Mono !important;
            }
        `}`}
    >
        {
            unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkReact, {
                    createElement: React.createElement,
                    remarkReactComponents: {
                        code: RemarkCode,
                    },
                    sanitize: {
                        ...defaultSchema,
                        attributes: {
                            ...defaultSchema.attributes,
                            code: [
                                ...(defaultSchema.attributes?.code || []),
                                'className',
                            ],
                        },
                    },
                })
                .processSync(doc).result
        }
    </div>
);

export default Preview;
