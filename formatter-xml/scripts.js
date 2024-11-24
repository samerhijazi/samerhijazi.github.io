function formatXML() {
    let xmlInput = document.getElementById('xml-input').value;
    try {
        let formattedXML = formatXMLString(xmlInput);
        document.getElementById('formatted-xml').innerHTML = formattedXML;
    } catch (error) {
        document.getElementById('formatted-xml').textContent = 'Invalid XML';
    }
}

function formatXMLString(xml) {
    let PADDING = ' '.repeat(2); // Set desired indent size here
    let reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    let formatted = '';
    xml.split('\r\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        formatted += PADDING.repeat(pad) + highlightXML(node) + '\r\n';
        pad += indent;
    });

    return formatted;
}

function highlightXML(xml) {
    xml = xml.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return xml.replace(/(&lt;\/?)(\w+)(.*?)(\/?&gt;)/g, function (match, p1, p2, p3, p4) {
        return (
            '<span class="tag">' +
            p1 +
            '</span><span class="element">' +
            p2 +
            '</span>' +
            highlightAttributes(p3) +
            '<span class="tag">' +
            p4 +
            '</span>'
        );
    });
}

function highlightAttributes(attrString) {
    return attrString.replace(/(\w+)=(".*?")/g, function (match, p1, p2) {
        return (
            ' <span class="attribute">' +
            p1 +
            '</span>=<span class="value">' +
            p2 +
            '</span>'
        );
    });
}
