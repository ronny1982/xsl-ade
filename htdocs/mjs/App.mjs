import DocumentPanel from './DocumentPanel.mjs';
import CodeViewer from './CodeViewer.mjs';

export default function App(props) {
    return React.createElement('div', {
        id: 'app'
    },
        React.createElement(DocumentPanel, {}, null),
        React.createElement(CodeViewer, {}, null)
    );
}