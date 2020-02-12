import ArchiveViewer from './ArchiveViewer.mjs';
import DocumentInfo from './DocumentInfo.mjs';

export default function DocumentPanel(props) {
    return React.createElement('div', {
        id: 'documentpanel'
    },
    React.createElement(ArchiveViewer, {}, null),
    React.createElement(DocumentInfo, {}, null),
    React.createElement('button', {
        id: 'downloadbutton',
        title: 'Download the XML content of the currently selected file',
        disabled: false,
    }, 'Download...'));
}