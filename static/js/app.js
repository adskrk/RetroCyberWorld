document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('command-input');
    const terminal = document.querySelector('.terminal');

    // Adds a new line of text to the terminal output.
    function addOutput(text, isError = false) {
        const line = document.createElement('p');
        line.textContent = text;
        if (isError) {
            line.style.color = 'red';
        }
        outputDiv.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Handles user input when they press Enter.
    inputField.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const command = inputField.value.trim().toLowerCase();
            addOutput(`> ${command}`);
            inputField.value = '';

            if (command === 'help') {
                addOutput('Available commands: help, login, secret');
            } else if (command === 'login') {
                addOutput('Authenticating...');
                addOutput('For this demonstration, use the password "cyberpunk2025" and username "hacker"');
                await handleLogin();
            } else if (command === 'secret') {
                const token = localStorage.getItem('jwt_token');
                if (token) {
                    await getSecret(token);
                } else {
                    addOutput('Error: You need to log in first. Type "login".', true);
                }
            } else {
                addOutput(`Unknown command: '${command}'`, true);
            }
        }
    });

    // Function to send a login request to the Flask server.
    async function handleLogin() {
        const username = "hacker";
        const password = "cyberpunk2025";

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('jwt_token', data.token);
                addOutput('Login successful. You can now try to access the secret.');
            } else {
                addOutput(`Login failed: ${data.error}`, true);
            }
        } catch (error) {
            addOutput('Network error during login.', true);
        }
    }

    // Function to request the secret key from the protected endpoint.
    async function getSecret(token) {
        try {
            const response = await fetch('/secret', {
                headers: { 'Authorization': token }
            });
            const data = await response.json();

            if (response.ok) {
                addOutput(`\n------------------`);
                addOutput(`SECRET KEY: ${data.secret_key}`);
                addOutput(`------------------\n`);
            } else {
                addOutput(`Error: ${data.error}`, true);
            }
        } catch (error) {
            addOutput('Network error while getting secret.', true);
        }
    }

    // Initial messages displayed on the terminal when the page loads.
    addOutput('GDG Retro Cyber World v1.0 Initializing...');
    setTimeout(() => {
        addOutput('Type "help" to see available commands.');
    }, 1000);
});

// Function to simulate typing text
function typeText(elementId, text, speed) {
    const element = document.getElementById(elementId);
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Other code...
    const initialMessage = 'GDG Retro Cyber World v1.0 Initializing...';
    typeText('typewriter-text', initialMessage, 50); // Speed in milliseconds
});