import React from 'react';
import ReactDOM from 'react-dom';
import './css/other/index.css';
import App from './tsx/App';
import reportWebVitals from './reportWebVitals';
import { IThemeProps } from './tsx/interface/MarkdownInterface';

class Index extends React.Component<{}, IThemeProps> {

    private readonly key: string;

    private constructor(readonly props: any) {
        super(props);
        this.key = 'isLightMode';
        const localStor = localStorage.getItem(this.key);
        this.state = {
            isLightMode: localStor === null ? false : JSON.parse(localStor)
        };
    }

    private toggleTheme = () => {
        this.setState(prevState => ({
            isLightMode: !prevState.isLightMode
        }));
        localStorage.setItem(this.key, JSON.stringify(!this.state.isLightMode));
    }

    render() {
        return (
            this.subRootDiv()
        );
    }

    private subRootDiv = (): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> => {
        return (
            <div id='sub-root' className={this.state.isLightMode ? 'light-theme' : ''}>
                {<App isLightMode={this.state.isLightMode} toggleTheme={this.toggleTheme}/>}
            </div>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();