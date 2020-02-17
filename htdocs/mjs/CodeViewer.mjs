export default function CodeViewer(props) {

    const [editor, setEditor] = React.useState(undefined);

    function initialize(element) {
        if(!monaco) {
            return console.warn('Dependency "monaco-editor" is not available!');
        }
        if(element && !editor) {
            setEditor(monaco.editor.create(element, {
                theme: props.theme,
                language: props.language,
                automaticLayout: true,
                readOnly: true
            }));
        }
    }

    React.useEffect(() => {
        if(editor) {
            editor.setValue(props.content || '');
        }
    });

    return React.createElement('div', {
        id: 'codeviewer',
        ref: element => initialize(element)
    }, null);
}