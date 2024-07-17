function formatYAML() {
    const input = document.getElementById('input').value;
    let formattedYAML = '';
    
    try {
        const parsedYAML = jsyaml.load(input);
        formattedYAML = jsyaml.dump(parsedYAML, { indent: 2 });
    } catch (e) {
        formattedYAML = 'Invalid YAML: ' + e.message;
    }

    document.getElementById('output').value = formattedYAML;
}

// Include this script tag in the HTML to load the js-yaml library from a CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/js-yaml@4.0.0/dist/js-yaml.min.js';
script.onload = () => console.log('js-yaml library loaded successfully.');
document.head.appendChild(script);
