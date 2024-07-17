function formatJson(json) {
    json = JSON.stringify(json, null, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-value';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function decodeJWT() {
    const jwtInput = document.getElementById('jwtInput').value;
    const outputElement = document.getElementById('jwtOutput');

    try {
        const decoded = jwt_decode(jwtInput);
        outputElement.innerHTML = formatJson(decoded);
    } catch (error) {
        outputElement.textContent = 'Invalid JWT: ' + error.message;
    }
}

function resetInput() {
    const inputElement = document.getElementById('jwtInput');
    const outputElement = document.getElementById('jwtOutput');
    inputElement.value = '';
    outputElement.textContent = '';
}
