# Project Initialization

This project uses [Vite](https://vitejs.dev/), a build tool, and development environment for front-end web development. Vite offers fast, optimized builds and a great developer experience.

# Firebase Integration

Firebase is used in this project to handle various backend services such as authentication, database, and storage. To integrate Firebase into your project, you need to add the necessary Firebase SDKs and configure the Firebase project. Here's how you can set up your Firebase configuration:

- [ ] Add SDKs for Firebase products that you want to use in a [src/models/database/firebase-config.ts](src/models/database/firebase-config.ts) file that looks like this:

```typescript
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

export default firebaseConfig;
```

Fill in the configuration details with the appropriate values from your Firebase project. You can find these values in your Firebase project settings.
For more information and guidance on setting up Firebase in your project, please refer to the [Firebase documentation](https://firebase.google.com/docs/web/setup#available-libraries)

## Local Development Setup

To set up your local development environment, and run the project in development mode, simply follow these steps, by running these commands in the terminal:

1. Once you're in the project's directory/folder, install the necessary dependencies by running the following command in the terminal:

```bash
npm install
```

- This will fetch and install all the required files and packages.

2. Launch a local development server by executing the following command:

```bash
npm run dev
```

- This will start a local server accessible at [http://localhost:5173/](http://localhost:5173/)

By following these steps, you'll be ready to begin working on your project.

## Building & Deploy

To build the updated code, and deploy it to Firebase hosting, simply follow these steps:

1. Using vite to bundle/build the project, run the following command:

```bash
npm run build
```

2. Using the [Firebase CLI](https://firebaseopensource.com/projects/firebase/firebase-tools/), first verify it is installed globally by running this command in the terminal:

```bash
firebase -v
```

- This should return a response in the terminal letting you know which version you currently have.

- If you know that you don't have the Firebase CLI installed globally, or the returned value after running the version command returns "command not found", go ahead and install the firebase-tools using the "-g" flag for global:

```bash
npm install -g firebase-tools
```

- Then continue by logging in with Firebase:

```bash
firebase login
```

- This command should allow you to authenticate using your Firebase account. Requires access to a web browser.

- Once logged in, you have to set up the link to the Firebase project you'll be using.

```bash
firebase init
```

- Scroll down to the value "Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys", and hit your spacebar, selecting it, then select the Firebase project you wish to link to. Finally, when prompted "What do you want to use as your public directory?" make sure to input "dist/" (without the quotes), and accept all the defaults after.

3. Finally, we can deploy the changes!

```bash
firebase deploy
```

# TypeScript

This project utilizes [TypeScript](https://www.typescriptlang.org/docs/), which is a powerful and statically-typed superset of JavaScript that brings an additional layer of reliability and efficiency to web development. It introduces a robust type system, allowing developers to define and enforce clear data types for variables, function parameters, and return values. This not only enhances code clarity but also catches potential errors during development, leading to more stable and maintainable code.

# MVC Project Structure

The use of the Model-View-Controller (MVC) folder structure in this project enhances code organization and maintainability. MVC divides the application into three distinct components - Model, View, and Controller - ensuring clear separation of data, presentation, and user interaction logic. This separation promotes clean, modular development, simplifies debugging, and supports collaborative development efforts, making it an ideal choice for structuring this project. To learn more about MVC, you can visit Mozilla's MVC [Documentation](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

# React Router DOM

[React Router DOM](https://reactrouter.com/en/main) is a powerful library utilized in React applications to facilitate seamless navigation by rendering different components based on the URL. Projects often opt for React Router DOM due to its ability to create a single-page application experience while maintaining multiple views. It offers a declarative way to define routes, allowing developers to structure their applications with distinct URLs for various components, enhancing user experience and SEO optimization.

# Redux Toolkit

[Redux](https://redux.js.org/) is utilized to manage the state. It helps maintain and distribute the data/state between different pages or components. This ensures a consistent and predictable data flow throughout the application. Redux is a powerful tool for managing complex state in your React application.

# Material UI

[MUI](https://mui.com/) offers a comprehensive suite of free UI (User Interface) tools to help you ship new features faster. With built in Buttons, Cards, etc.

# Git

[Git](https://git-scm.com/) is a distributed version control system. Git allows multiple developers to work on the same project concurrently while maintaining a complete history of changes. It operates by creating a snapshot of the project at each stage, enabling efficient branching, merging, and tracking of alterations.

By following these instructions, you can get your project up and running smoothly and leverage the power of Firebase for various features and services.
