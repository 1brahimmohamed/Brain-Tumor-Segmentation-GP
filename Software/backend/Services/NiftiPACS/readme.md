# Flask MVC Starter Boilerplate

This is a basic MVC (Model-View-Controller) starter template for building web applications using Flask. It provides a structured foundation to get you started with your Flask projects quickly.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage) 
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- Flask web application with MVC architecture.
- Separation of concerns: Models for data handling and Controllers for handling requests.
- PostgreSQL
- Simple configuration setup.
- Sample routes to serve as examples.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/samiur-r/flask-mvc-starter.git
```

2. Change into the project directory:

```bash
cd flask-mvc-starter
```

3. Create and activate a virtual environment (optional but recommended):

```bash
python3 -m venv env
source env/bin/activate
```

4. Install the required dependencies:

  ```bash
pip install -r requirements.txt
```

# Configuration

- Rename the .env.example file to .env.

- Modify the .env file to configure the application settings (e.g., database connection details, secret key, etc.).

# Usage

1. Start the Flask development server:
```bash
python app.py
```

2. Open your web browser and visit http://localhost:5000 to access the application.

# Project Structure

--------

  ```sh
  ├── README.md
  ├── app.py
  ├── db.py
  ├── requirements.txt
  ├── models
  │   ├── User.py
  ├── controllers
  │   ├── UserController.py
  ├── services
  │   ├── UserService.py
  ├── routes
  │   ├── user_routes.py

  ```

# Contributing

Contributions are welcome! If you find any issues or want to contribute enhancements, please submit a pull request.
