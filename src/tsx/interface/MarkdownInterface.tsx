//text area
interface IMarkdownContProps {
    markdownContent: string
}

interface IUpdateMarkdownText {
    updateMarkdownContent: (markdownContent: string) => void;
}

interface IUpdateTextArea extends IUpdateMarkdownText, IMarkdownContProps{}


//preview
interface IUpdatePreview extends IMarkdownContProps, IMarkdownTypeProps {}


//theme
interface IThemeProps {
    isLightMode: boolean
}

interface IThemeToggle extends IThemeProps{
    toggleTheme: () => void
}


//markdown type
interface IMarkdownTypeProps {
    fullMarkdownFeature: boolean
}

interface IChangeMarkdownType {
    enableFullMarkdown: () => void
    disableFullMarkdown: () => void
}



export type {IChangeMarkdownType, IUpdatePreview, IThemeProps, IThemeToggle, IMarkdownTypeProps, IUpdateMarkdownText, IUpdateTextArea};