##### Dynamic Dashboard with Widgets ####

## Overview ---
This project is a dynamic dashboard page built using `React.Js`. The dashboard allows users to manage categories and widgets, including adding, removing, and searching for widgets within categories.


## Features ---
# Dynamic Categories and Widgets: 
    Categories and widgets are defined in a JSON structre using redux and rendered dynamically.
# State Management:
    The application uses Redux for handling the addition and removal of widgets locally.
# Add and Remove Widgets: 
    Users can add new widgets with a name and text to any category and remove widgets from categories.
# Search Functionality: 
    Users can search for widgets across all categories.


## Tool & Technologies Used ---
    HTML, CSS, JavaScript, TailwindCSS, Ant design(react)
    React.js
    State Management Tool (Redux)
    Chart.js llibrary for showing charts


## Getting Started ---
# Prerequisites
    Node.js installed on your machine

# Installation:
    Extract the zip in your system's directory

# Install dependencies:
   Run `npm install` in the project directory 

# Run the application:
   Run `npm start` in the project directory
   This will start the application on `http://localhost:3000`.

## Usage ---
# Adding a Widget:
    - Click on the "+Add Widget" button in the desired category.
    - Enter the widget name and text in the provided fields.
    - Click "Add" to add the widget to the category.

# Removing a Widget:
    - Click the 'CROSS' icon on the widget you want to remove.

# Search:
    - Use the search bar to find specific widgets across all categories.

## Code Structure ---
    - src/: Contains the main source code for the application.
    - components/: Reusable components like Dashboard, Header, DoughnutChart etc.
    - redux/store/: State management setup and logic.
    - redux/slices/: Json Data for showing the widgets and catagories.
    - assets/: images.
    - public/: Public assets and the index.html file.
    - package.json: Project dependencies and scripts.

