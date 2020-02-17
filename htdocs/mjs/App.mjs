import ArchiveViewer from './ArchiveViewer.mjs';
import DocumentInfo from './DocumentInfo.mjs';
import CodeViewer from './CodeViewer.mjs';

export default function App(props) {

    const [selectedFile, setSelectedFile] = React.useState({});

    function prettyXML(xml) {
        if(!xml) {
            return xml;
        }
        let xmlDoc = new DOMParser().parseFromString(xml, 'application/xml');
        let xsltDoc = new DOMParser().parseFromString(`
            <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
                <xsl:strip-space elements="*"/>
                <xsl:template match="para[content-style][not(text())]">
                    <xsl:value-of select="normalize-space(.)"/>
                </xsl:template>
                <xsl:template match="node()|@*">
                    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
                </xsl:template>
                <xsl:output indent="yes"/>
            </xsl:stylesheet>
        `, 'application/xml');
        let xsltProcessor = new XSLTProcessor();    
        xsltProcessor.importStylesheet(xsltDoc);
        return new XMLSerializer().serializeToString(xsltProcessor.transformToDocument(xmlDoc));
    };

    function onChangeEvent(data) {
        setSelectedFile(data || {});
    }

    return React.createElement('div', { id: 'app' },
        React.createElement('div', { id: 'documentpanel' },
            React.createElement(ArchiveViewer, { onChange: onChangeEvent }, null),
            React.createElement(DocumentInfo, { content: selectedFile.json || '' }, null)
        ),
        React.createElement(CodeViewer, {
            theme: 'vs-light',
            language: 'xml',
            content: prettyXML(selectedFile.xml) || ''
        }, null)
    );
}