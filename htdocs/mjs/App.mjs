import ArchiveViewer from './ArchiveViewer.mjs';
import DocumentInfo from './DocumentInfo.mjs';
import CodeViewer from './CodeViewer.mjs';

export default function App(props) {

    const [selectedJSON, setSelectedJSON] = React.useState(undefined);
    const [selectedXML, setSelectedXML] = React.useState(undefined);

    function onChangeEvent(data) {
        setSelectedJSON(data.json || '');
        setSelectedXML(data.xml || '');
    }

    return React.createElement('div', { id: 'app' },
        React.createElement('div', { id: 'documentpanel' },
            React.createElement(ArchiveViewer, { onChange: onChangeEvent }, null),
            React.createElement(DocumentInfo, { content: selectedJSON }, null)
        ),
        React.createElement(CodeViewer, { content: selectedXML }, null)
    );
}