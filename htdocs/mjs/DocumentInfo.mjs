function getProperties(file) {
    return [
        'properties ...'
    ];
}

export default function DocumentInfo(props) {
    return React.createElement('pre', {
        id: 'documentinfo'
    }, props.content);
}