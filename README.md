GDG Retro Cyber World 🌐
Project Overview
Welcome to the GDG Retro Cyber World, a project for the Google Developer Group's technical assessment. This web application is a digital terminal with a retro-cyber aesthetic inspired by 1990s hacker culture. It challenges users to discover a hidden secret key through a two-step authentication process. The project showcases skills in full-stack development, themed design, and creative problem-solving.



Technical Architecture
This project is built using a simple yet robust full-stack architecture:

Backend: The backend is powered by Python and the Flask micro-framework. It handles the core logic, including user authentication and serving the secret key. We implemented 

JWT (JSON Web Token) to secure a protected endpoint, ensuring that only authenticated users can access the hidden information.

Frontend: The user interface is built with HTML, CSS, and JavaScript.

HTML provides the basic structure of the terminal interface.


CSS applies the retro-cyber aesthetics, including neon color schemes, monospace fonts, and a scanline effect.


JavaScript handles all interactive elements, such as the simulated command line and communication with the backend APIs.

Visual Documentation
Setup and Installation
Follow these steps to run the project on your local machine:

Clone the Repository:

Bash

git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
Create a Virtual Environment: (Recommended)

Bash

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Dependencies:

Bash

pip install Flask PyJWT
Run the Application:

Bash

python app.py
Your application will start running on http://127.0.0.1:5000.

Secret Key Discovery Process
<details>
<summary><b>SPOILER ALERT: Click to reveal the solution</b></summary>
<br>
The secret key is hidden behind a two-step authentication process that requires investigative effort.

Login: To gain a valid authentication token, you must type the login command into the terminal interface. This command uses hardcoded credentials (hacker / cyberpunk2025) to authenticate with the backend and receive a JWT.

Access the Secret: Once authenticated, the token is stored in your browser's local storage. You can then type the secret command. The JavaScript will send your token to the protected /secret endpoint, and the backend will validate the token before revealing the secret key.

</details>
