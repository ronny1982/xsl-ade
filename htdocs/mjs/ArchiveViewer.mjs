const mimes = {
    '': 'application/octet-stream',
    'json': 'application/json',
    'xml': 'application/xml',
    'txt': 'text/plain',
    'png': 'image/png'
};

export default function ArchiveViewer(props) {

    const [archiveEntries, setArchiveEntries] = React.useState([]);
    const [selectedJSON, setSelectedJSON] = React.useState(undefined);
    const [selectedXML, setSelectedXML] = React.useState(undefined);

    async function loadArchive(evt) {
        let entries = [];
        if(evt.target.files && evt.target.files.length === 1) {
            let zip = await JSZip.loadAsync(evt.target.files[0], {});
            zip.forEach((_, entry) => {
                if(!entry.dir) {
                    entries.push(entry);
                }
            });
        }
        // TODO: sort entries by directory path and name ...
        setArchiveEntries(entries.sort());
    }

    async function selectFile(entries, name) {
        let data = await entries.find(file => file.name === name).async('blob');
        if(!data.type) {
            data = data.slice(0, data.size, mimes[name.split('.').pop()] || mimes['']);
        }
        let json = undefined;
        let xml = undefined;
        if(data && data.type && data.type.toLowerCase().includes('json')) {
            json = JSON.parse(await data.text());
            if(json.Content && json.Content.Data) {
                xml = json.Content.Data;
                json.Content.Data = '…';
            }
            json = JSON.stringify(json, null, 2);
        }
        setSelectedJSON(json);
        setSelectedXML(xml);
        props.onChange({
            json: json,
            xml: xml
        });
    }

    async function download() {
        if(selectedXML) {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([selectedXML], { type: mimes.xml }));
            a.download = 'content.xml';
            a.click();
            // TODO: free object URL after download complete ...
        } else {
            alert('Please select a JSON file with valid XML content from the archive!');
        }
    }

    function getOptions(entries, file) {
        return entries.map(entry => React.createElement('option', {
            selected: entry === file,
            value: entry.name
        }, entry.name));
    }

    return React.createElement('div', {
        id: 'archiveviewer'
    }, React.createElement('input', {
        id: 'archiveupload',
        type: 'file',
        onChange: loadArchive
    }, null), React.createElement('select', {
        id: 'archiveselection',
        size: 2,
        onChange: evt => selectFile(archiveEntries, evt.target.value)
    }, getOptions(archiveEntries)), React.createElement('button', {
        id: 'downloadfile',
        title: 'Download the XML content of the currently selected file',
        disabled: false,
        onClick: () => download()
    }, 'Download...'));
}