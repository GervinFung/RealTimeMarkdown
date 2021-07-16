import React from 'react';
import '../css/App.css';
import '../css/markdown/Markdown.css';
import {IThemeToggle, IUpdatePreview} from './interface/MarkdownInterface';
import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownPreview from './markdown/MarkdownPreview';
import Footer from './other/Footer';
import Header from './other/Header';
import Popup from './other/Popup';

class App extends React.Component<IThemeToggle, IUpdatePreview> {

    private readonly key: string;

    private constructor(readonly props: IThemeToggle) {
        super(props);
        this.key = 'markdownCont';
        const localStor = localStorage.getItem(this.key);
        this.state = {
            markdownContent: localStor === null ? '**code block**\n**bold**\n***italic***\n_underscore_\n~~strike through~~\n|| discord spoiler tag    ||\n\n|  Syntax      |Description  | Test Text     |\n|  :---        |     :----:    |          ---: |\n|  **bold 1123.**    | _123. underscore_ | `code block`  |\n| ***123 italic 123*** | ~~seems ok strike through~~ | || discord spoiler tag    ||  |\n| 0    | abc | 123123123  |\n\n1. **_bold_**\n1. _123_\n1. `**another 123**`\n1. *****italic*****\n1. `~~strike through~~`\n1. || discord spoiler tag    ||' : localStor,
            fullMarkdownFeature: false
        };
    }

    private updateMarkdownContent = (markdownContent: string): void => {
        this.setState({
            markdownContent
        });
        localStorage.setItem(this.key, markdownContent)
    }

    private enableFullMarkdown = (): void => {
        this.setState({
            fullMarkdownFeature: true
        });
    }

    private disableFullMarkdown = (): void => {
        this.setState({
            fullMarkdownFeature: false
        });
    }

    render() {
        return (
            <div className='App'>
                <Popup/>
                <Header
                    markdownContent={this.state.markdownContent}
                    enableFullMarkdown={this.enableFullMarkdown}
                    disableFullMarkdown={this.disableFullMarkdown}
                    updateMarkdownContent={this.updateMarkdownContent}
                    isLightMode={this.props.isLightMode}
                    toggleTheme={this.props.toggleTheme}
                    fullMarkdownFeature={this.state.fullMarkdownFeature}
                />
                <div className='markup-container'>
                    <div className='editor-and-preview'>
                        <MarkdownEditor
                            markdownContent={this.state.markdownContent}
                            updateMarkdownContent={this.updateMarkdownContent}
                        />
                        <MarkdownPreview
                            markdownContent={this.state.markdownContent}
                            fullMarkdownFeature={this.state.fullMarkdownFeature}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;