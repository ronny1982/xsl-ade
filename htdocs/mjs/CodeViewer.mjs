export default function CodeViewer(props) {
    return React.createElement('iframe', {
        id: 'codeviewer',
        src: URL.createObjectURL(new Blob([props.content], { type: 'application/xml' }))
    }, null);
}