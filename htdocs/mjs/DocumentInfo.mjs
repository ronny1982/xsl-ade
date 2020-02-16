function getProperties(file) {
    return [
        'properties ...'
    ];
}

export default function DocumentInfo(props) {
    return React.createElement('div', {
        id: 'documentinfo'
    }, props.content);
}