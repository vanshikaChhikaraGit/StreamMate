# Real-Time Chat Application(https://streammate.onrender.com/)

A full-stack **Real-Time Chat Application** designed to enable seamless communication with an interactive and personalized user experience. This web app supports real-time messaging, secure user authentication, and live user tracking, making it ideal for both personal and group chats.

## Key Features

- **Dynamic User Authentication**: Secure sign-in and sign-up functionality using **JWT (JSON Web Token)** to protect user data and ensure safe access.
- **Interactive Messaging System**: Real-time messaging with support for both text and image sharing using **WebSockets** (via Socket.IO), ensuring instant communication.
- **Active User Tracking**: A live sidebar that dynamically displays all users and updates their statuses in real-time, allowing users to see who’s online.
- **Scalable Backend Architecture**: A robust backend built with **Node.js**, **Express**, and **MongoDB** to handle chat data efficiently, ensuring scalability.
- **Personalized User Profiles**: An intuitive settings and profile page that allows users to customize their avatars, themes, and personal information for a personalized experience.

## Technologies Used

- **Frontend**: React, Zustand (for state management)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-Time Communication**: WebSockets (Socket.IO)
- **Authentication**: JWT (JSON Web Token)

## Getting Started

Follow the steps below to set up the project locally:

### Prerequisites

Make sure you have the following installed:
- Node.js
- MongoDB (or a MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-chat-application.git
   cd real-time-chat-application
2. Frontend Setup:
  - Navigate to the frontend directory:
    cd frontend
  - Install dependencies:
   npm install
3. Backend Setup:
  - Navigate to the backend directory:
    cd backend
  - Install backend dependencies:
   npm install
4. Run the Application:
  - In the frontend directory, run:
    npm start
  - In the backend directory, run:
    npm start
5. Visit http://localhost:3000 to view the application.
