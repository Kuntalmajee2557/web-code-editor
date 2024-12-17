# Web Code Editor

## Overview

This is a simple web-based code editor that provides a minimal development experience with integrated file management, code editing, and terminal functionality.

## Features

- **File Tree Navigation**
  - Displays a hierarchical view of project files and directories
  - Supports clicking to select and open files
  - Excludes `node_modules` directory for cleaner navigation

- **Code Editor**
  - Powered by Ace Editor
  - Supports syntax highlighting for multiple programming languages
  - Automatic language mode detection
  - Ambiance theme
  - Real-time file content synchronization

- **Integrated Terminal**
  - Xterm.js powered terminal
  - Provides direct command-line interface
  - Full interaction with underlying system shell

- **Real-time File Synchronization**
  - Automatic file content updates
  - Socket.io based communication between frontend and backend

## Supported Languages

The editor supports syntax highlighting for:
- JavaScript, TypeScript
- Python, Java, C/C++, C#
- Ruby, Go, Rust, Swift
- HTML, CSS, SCSS
- JSON, YAML
- Markdown, LaTeX
- And many more!

## Technologies Used

- **Frontend**
  - React
  - Socket.io-client
  - Ace Editor
  - Xterm.js

- **Backend**
  - Express.js
  - Socket.io
  - Node-pty
  - Chokidar (file watching)

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/Kuntalmajee2557/web-code-editor.git
cd web-code-editor
```

2. Install dependencies
```bash
# For backend
cd server
npm install

# For frontend
cd ../client
npm install
```
3. Create User Folder
```bash
# In the backend directory
cd backend
mkdir user
```
**Important:** The `user` folder is crucial as it serves as the working directory for files created or edited in the web code editor.

4. Start the development servers
```bash
# Start backend (port 3000)
cd server
npm run dev

# Start frontend (typically port 5173)
cd ../client
npm run dev
```
