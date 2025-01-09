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
    
    const div = document.getElementById('result');   
    //div.textContent = ''; // Or use div.innerHTML = '';
    div.innerHTML = 'Decoded Date & Time (German Time):';
}

function decodeTimestamp() {
    const timestampInput = document.getElementById('timestamp').value;
    const timestamp = parseInt(timestampInput, 10);

    if (isNaN(timestamp)) {
        document.getElementById('result').innerHTML = "<span style='color: red;'>Please enter a valid Unix timestamp.</span>";
        return;
    }

    // Convert Unix timestamp to a Date object
    const date = new Date(timestamp * 1000);

    // Format the date and time in German time (Central European Time)
    const formattedDate = date.toLocaleString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Berlin'
    });

    // Display the result
    document.getElementById('result').textContent = `Decoded Date & Time (German Time): ${formattedDate}`;
}