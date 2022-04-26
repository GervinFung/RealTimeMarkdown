import * as React from 'react';
import getSpanStyle, { getLanguage } from '../../parse/getSpanStyle';

type Tokens = ReadonlyArray<
    Readonly<{
        text: string;
        style: string | null;
    }>
>;

const RemarkCode = ({
    className,
    children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
    const [state, setState] = React.useState({
        spans: [] as Tokens,
    });

    const languageName = (className || '').substring(9);

    const { spans } = state;

    React.useEffect(() => {
        getLanguage(languageName).then((language) => {
            if (language) {
                const body = Array.isArray(children) ? children[0] : undefined;
                setState((prev) => ({
                    ...prev,
                    spans: !body
                        ? []
                        : getSpanStyle({
                              language,
                              textContent: body as string,
                          }),
                }));
            }
        });
    }, [children]);

    return spans.length === 0 ? (
        <code>{children}</code>
    ) : (
        <code>
            {spans.map((span, i) => (
                <span key={i} className={span.style || ''}>
                    {span.text}
                </span>
            ))}
        </code>
    );
};

export type { Tokens };

export default RemarkCode;
