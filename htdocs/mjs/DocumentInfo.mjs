export default function DocumentInfo(props) {

    return React.createElement('pre', {
        id: 'documentinfo'
    }, React.createElement('code', {
        className: 'json',
        ref: element => element && hljs.highlightBlock(element)
    }, props.content));
}