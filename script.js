// Get references to DOM elements
const fileInput = document.getElementById('file-input');
const startButton = document.getElementById('start-button');
const jsonViewer = document.getElementById('json-viewer');

let jsonData = null; // Store JSON data here

// Event: File selection
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select a JSON file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            jsonData = JSON.parse(e.target.result); // Parse JSON data
            alert('JSON file loaded successfully! Click "Start Producing" to view the content.');
            startButton.disabled = false; // Enable the button
        } catch (error) {
            alert('Invalid JSON file. Please upload a valid JSON file.');
            startButton.disabled = true; // Disable the button
            jsonData = null;
        }
    };
    reader.readAsText(file);
});

// Event: Start Producing button click
startButton.addEventListener('click', () => {
    if (!jsonData) {
        alert('No JSON data to display. Please upload a valid file.');
        return;
    }
    displayJson(jsonData); // Call function to display JSON
});

// Function to display JSON content
function displayJson(data) {
    jsonViewer.innerHTML = ''; // Clear the viewer
    const formattedJson = createJsonElement(data);
    jsonViewer.appendChild(formattedJson); // Append formatted JSON
}

// Recursive function to create formatted JSON elements
function createJsonElement(data) {
    if (typeof data === 'object' && data !== null) {
        const container = document.createElement('div');
        container.style.marginLeft = '20px';

        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `<strong>[${index}]:</strong>`;
                itemElement.appendChild(createJsonElement(item));
                container.appendChild(itemElement);
            });
        } else {
            Object.entries(data).forEach(([key, value]) => {
                const keyElement = document.createElement('div');
                keyElement.innerHTML = `<strong>${key}:</strong>`;
                keyElement.appendChild(createJsonElement(value));
                container.appendChild(keyElement);
            });
        }

        return container;
    } else {
        const valueElement = document.createElement('span');
        valueElement.style.display = 'inline-block';
        valueElement.style.margin = '5px 0';

        if (typeof data === 'string') {
            valueElement.style.color = '#d32f2f';
            valueElement.textContent = `"${data}"`;
        } else if (typeof data === 'number') {
            valueElement.style.color = '#1976d2';
            valueElement.textContent = data;
        } else if (typeof data === 'boolean') {
            valueElement.style.color = '#f57c00';
            valueElement.textContent = data;
        } else if (data === null) {
            valueElement.style.color = '#757575';
            valueElement.textContent = 'null';
        }

        return valueElement;
    }
}
