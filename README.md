# RapidChat (Next.js 14 Real-Time Chat App)

RapidChat is a real-time chat application built using Socket.IO and Next.js 14. It provides users with a seamless chatting experience along with several features to enhance communication.

## Table of Contents

1. [Features](#features)
2. [Project Tree](#project-tree)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)

## Features

- **CLERK Authentication**: Implement CLERK Authentication for sign-up and sign-in.
- **User Management**: Logged in users can view a list of all registered users in the application.
- **Chat Functionality**:
  - Users can add other users to their chats list to start chatting.
  - Support for one-to-one and group chats.
- **Profile Management**:
  - Users can update their profile picture.
  - Create and edit groups.
- **Unread Messages Count**: Users can see the unread messages count in the chats list for every chat.
- **Real-Time Communication**:
  - Integration of Socket.IO for real-time chat functionalities.
  - Send and receive messages in real-time.
- **Typing Indicators**: Recipient users can see the typing animation when a user is typing in the chat.
- **Read Receipts**: Provides read receipts functionality for messages.

## Project Tree

- .eslintrc.json
- .gitignore
- README.md
- next.config.mjs
- package-lock.json
- package.json
- postcss.config.js
- public
  - chatlogo.webp
  - next.svg
  - vercel.svg
- src
  - app
    - (private)
      - \_chat-components
        - chat-area
          - image-selector.tsx
          - index.tsx
          - message.tsx
          - messages.tsx
          - new-message.tsx
          - recipient-info.tsx
          - recipient.tsx
        - chats
          - chat-card.tsx
          - chats-header.tsx
          - chats-list.tsx
          - index.tsx
          - new-chat-modal.tsx
      - groups
        - \_components
          - group-form.tsx
        - create-group
          - loading.tsx
          - page.tsx
        - edit-group
          - [id]
            - page.tsx
          - loading.tsx
      - page.tsx
    - favicon.ico
    - globals.css
    - layout.tsx
    - loading.tsx
    - sign-in
      - [[...sign-in]]
        - page.tsx
    - sign-up
      - [[...sign-up]]
        - page.tsx
  - components
    - loader.tsx
  - config
    - db-config.ts
    - firebase-config.ts
    - socket-config.ts
  - helpers
    - date-format.ts
    - image-upload.ts
  - interfaces
    - index.ts
  - middleware.ts
  - models
    - chat-model.ts
    - message-model.ts
    - user-model.ts
  - providers
    - layout-components
      - content.tsx
      - current-user-info.tsx
      - header.tsx
    - layout-provider.tsx
    - redux-provider.tsx
    - theme-provider.tsx
  - redux
    - chatSlice.ts
    - store.ts
    - userSlice.ts
  - server-actions
    - chat.ts
    - messages.ts
    - users.ts
- tailwind.config.ts
- tsconfig.json

## Technologies Used

- **Next.js 14**: Utilized for building the frontend of the application.
- **Socket.IO**: Integrated for real-time communication between users.
- **Firebase**: Used for backend services like authentication and database.
- **Redux**: Implemented for managing application state.
- **Tailwind CSS**: Used for styling and UI design.
- **Ant Design**: Employed for UI components and design elements.
- **CLERK**: Implemented for authentication purposes.

## Installation

To run RapidChat locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rapidchat.git
   ```

2. Install dependencies:
   ```bash
   cd rapidchat
   npm install
   ```
3. Configure CLERK authentication by following the instructions in the CLERK.md file.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to http://localhost:3000 to access RapidChat.

## Usage

1. **Sign up or sign in**: Use CLERK authentication to sign up or sign in to the application.
2. **Explore Users**: Once logged in, explore the list of registered users available in the application.
3. **Start Chatting**: Add users to your chats list to start chatting. You can initiate one-to-one or group chats.
4. **Manage Profile**: Update your profile picture and manage groups as needed.
5. **Real-Time Communication**: Enjoy real-time communication with other users. Messages are sent and received instantly.
6. **Typing Indicators**: See typing indicators when another user is typing in the chat.
7. **Read Receipts**: Track message read receipts to know when your message has been seen by the recipient.
