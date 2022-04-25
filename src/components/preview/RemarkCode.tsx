import * as React from 'react';
import runmode, { getLanguage } from '../../parse/runMode';

type Tokens = {
    text: string;
    style: string | null;
}[];

const RemarkCode = ({
    className,
    children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
    const [state, setState] = React.useState({
        spans: [] as Readonly<Tokens>,
    });
    const languageName = (className || '').substring(9);
    const { spans } = state;

    React.useEffect(() => {
        getLanguage(languageName).then((language) => {
            if (language) {
                const body = Array.isArray(children) ? children[0] : undefined;
                const tokens: Tokens = [];
                if (body) {
                    runmode({
                        language,
                        textContent: body as string,
                        callback: (
                            text: string,
                            style: string | null,
                            _from: number,
                            _to: number
                        ) => {
                            tokens.push({ text, style });
                        },
                    });
                    setState((prev) => ({
                        ...prev,
                        spans,
                    }));
                }
            }
        });
    }, [children]);

    if (spans.length > 0) {
        return (
            <code>
                {spans.map((span, i) => (
                    <span key={i} className={span.style || ''}>
                        {span.text}
                    </span>
                ))}
            </code>
        );
    } else {
        return <code>{children}</code>;
    }
};

export default RemarkCode;
