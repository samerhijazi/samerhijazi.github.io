document.getElementById('extractButton').addEventListener('click', () => {
    const xmlString = document.getElementById('xmlInput').value;
    const xpathString = document.getElementById('xpathInput').value;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const result = document.evaluate(xpathString, xmlDoc, null, XPathResult.ANY_TYPE, null);

    let node = result.iterateNext();
    let output = '';
    while (node) {
        output += node.textContent + '\n';
        node = result.iterateNext();
    }

    document.getElementById('result').textContent = output || 'No results found.';
});
