import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../css/markdown/Markdown.css';
import {IThemeToggle} from './interface/MarkdownInterface';
import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownPreview from './markdown/MarkdownPreview';
import Footer from './other/Footer';
import Header from './other/Header';

const App = (props: IThemeToggle) => {

    const { isLightMode, toggleTheme } = props;

    const key = 'markdownCont';

    const retrievedFromStorage = (): string => {
        const localStore = localStorage.getItem(key);
        return localStore === null ? '**code block**\n**bold**\n***italic***\n_underscore_\n~~strike through~~\n|| discord spoiler tag    ||\n\n|  Syntax      |Description  | Test Text     |\n|  :---        |     :----:    |          ---: |\n|  **bold 1123.**    | _123. underscore_ | `code block`  |\n| ***123 italic 123*** | ~~seems ok strike through~~ | || discord spoiler tag    ||  |\n| 0    | abc | 123123123  |\n\n1. **_bold_**\n1. _123_\n1. `**another 123**`\n1. *****italic*****\n1. `~~strike through~~`\n1. || discord spoiler tag    ||' : localStore;
    }

    const [markdownContent, setMarkdownContent] = useState(retrievedFromStorage());
    const [fullMarkdownFeature, setFullMarkdownFeature] = useState(false);

    useEffect(() => {
        localStorage.setItem(key, markdownContent);
    }, [markdownContent]);

    return (
        <div className='App'>
            <Header
                markdownContent={markdownContent}
                enableFullMarkdown={() => setFullMarkdownFeature(true)}
                disableFullMarkdown={() => setFullMarkdownFeature(false)}
                updateMarkdownContent={setMarkdownContent}
                isLightMode={isLightMode}
                toggleTheme={toggleTheme}
                fullMarkdownFeature={fullMarkdownFeature}
            />
            <div className='markup-container'>
                <div className='editor-and-preview'>
                    <MarkdownEditor
                        markdownContent={markdownContent}
                        updateMarkdownContent={setMarkdownContent}
                    />
                    <MarkdownPreview
                        markdownContent={markdownContent}
                        fullMarkdownFeature={fullMarkdownFeature}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;