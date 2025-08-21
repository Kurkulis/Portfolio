# Portfolio Project Documentation - Ignas Kurkulis

![Portfolio Screenshot](front-end/public/GitHub-README/portfolio-main.png)

## Overview

This is a portfolio website built with React and TypeScript for the frontend, and Node.js/Express for the backend. The portfolio showcases professional work, skills, and provides a contact system. The project includes a responsive design with Bootstrap, custom styling with SASS, and a reliable backend API for handling contact forms and managing other dynamic content.

The website is currently deployed and available at **kurkulis.lt**. The frontend is hosted on the **Hostinger** platform, while the backend, which processes contact form requests and sends emails, is deployed on **Railway.app** cloud service.

# Project Structure and Description

## Structure:

```
Portfolio/
├── server/
│   ├── models/
│   │   └── messagesModels.js
│   ├── routes/
│   │   └── messagesRoutes.js
│   ├── utils/
│   │   └── emailService.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── front-end/
│   ├── public/
│   │   ├── data/
│   │   │   ├── data_en.json
│   │   │   ├── data_lt.json
│   │   ├── favicon/
│   │   ├── About/
│   │   ├── Home/
│   │   ├── Project/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar/
│   │   │   │   └──NavBar.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   └──  home.tsx
│   │   │   ├── AboutMe/
│   │   │   │   └──  aboutMe.tsx
│   │   │   ├── Projects/
│   │   │   │   └──  projects.tsx
│   │   │   └── Contact/
│   │   │       └── contact.tsx
│   │   ├── contexts/
│   │   │   └──LanguageContext.tsx
│   │   ├── hooks/
│   │   │   └──useIntersectionObserver.ts
│   │   ├── types/
│   │   │   └── types.ts
│   │   ├── assets/
│   │   ├── sass/
│   │   │   ├── Home/
│   │   │   │   ├── home.scss
│   │   │   │   └── home-responsive.scss
│   │   │   ├── AboutMe/
│   │   │   │   ├── aboutMe.scss
│   │   │   │   └── aboutMe-responsive.scss
│   │   │   ├── NavBar/
│   │   │   │   └── NavBar.scss
│   │   │   ├── Projects/
│   │   │   │   ├── projects.scss
│   │   │   │   └── projects-responsive.scss
│   │   │   └── Contact/
│   │   │       ├── contact.scss
│   │   │       └── contact-responsive.scss
│   │   ├── tests/
│   │   │    ├── AboutMe.test.tsx
│   │   │    ├── App.test.tsx
│   │   │    ├── contactForm.test.tsx
│   │   │    ├── Home.test.tsx
│   │   │    ├── NavBar.test.tsx
│   │   │    └── Projects.test.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── tsconfig.app.json
│   ├── eslint.config.js
│   └── index.html
└── README.md
```

# Description

## Server (Backend)

1. models:  
   - messagesModels.js: Defines data structures for contact messages and portfolio objects.  
2. routes:  
   - messagesRoutes.js: Defines API endpoints for frontend-backend communication.  
3. utils:  
   - emailService.js: Provides email-sending functionality for contact forms.  
4. .env: Configuration file storing sensitive variables (database connections, API keys).  
5. server.js: Main server file that runs the Express backend.  
6. package.json: Node.js project dependencies and scripts.  

## Frontend

1. public:  
   - data: JSON files with multilingual content (English, Lithuanian).  
     - data_en.json: English content  
     - data_lt.json: Lithuanian content  
   - favicon: Full favicon collection for various platforms and sizes.  
   - About, Home, Project: Static resources for respective sections.  

2. src:  
   - components:  
     - NavBar: Responsive navigation component (NavBar.tsx).  
     - LoadingSpinner: Loading state component (LoadingSpinner.tsx).  
   - pages:  
     - Home: Homepage section (home.tsx).  
     - AboutMe: About me section (aboutMe.tsx).  
     - Projects: Portfolio projects section (projects.tsx).  
     - Contact: Contact section (contact.tsx).  
   - contexts:  
     - LanguageContext: Provides multilingual support (LanguageContext.tsx).  
   - hooks:  
     - useIntersectionObserver: Hook for page animations (useIntersectionObserver.ts).  
   - types:  
     - types.ts: Main app types and interfaces.  
   - sass:  
     - Home, AboutMe, NavBar, Projects, Contact styles (scss files).  
   - tests:  
     - AboutMe.test.tsx, App.test.tsx, contactForm.test.tsx, Home.test.tsx, NavBar.test.tsx, Projects.test.tsx.  
   - App.tsx: Main application component with routing.  
   - main.tsx: Application entry point.  
   - index.css: Global styles.  

3. Config files:  
   - vite.config.ts, tsconfig.json, tsconfig.node.json, tsconfig.app.json.  
   - eslint.config.js.  
   - .env and .env.example.  
   - .gitignore.  

# Installation and Setup

## Requirements
- Node.js (v16 or newer)  
- npm or yarn package manager  
- MongoDB database (local or cloud)  

## Backend Setup:
```bash
cd server
npm install
```

Create `.env` file with:  
```
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_password
NOTIFY_EMAIL=your_email
PORT=5000
```

Run the server:  
```bash
npm start
```

## Frontend Setup:
```bash
cd front-end
npm install
```

Create `.env` file with:  
```
VITE_API_URL=your_api_url
```

Run the dev server:  
```bash
npm run dev
```

# Testing

## Test files:
- AboutMe.test.tsx  
- App.test.tsx  
- contactForm.test.tsx  
- Home.test.tsx  
- NavBar.test.tsx  
- Projects.test.tsx  

Tests use **Vitest** and **React Testing Library**. Run with:  
```bash
npm test
```

# Features
- **Responsive Design**: Mobile-first with Bootstrap  
- **Modern UI/UX**: Clean design with smooth animations  
- **Contact System**: Backend-supported contact form with email notifications  
- **API Protection**: Spam prevention with Express Rate Limiter  

# Technologies Used

## Frontend:
- React 18  
- TypeScript  
- Vite  
- Bootstrap 5  
- React Bootstrap  
- SASS  
- FontAwesome  
- Bootstrap Icons  
- Poppins Font  

## Backend:
- Node.js  
- Express.js  
- MongoDB/Mongoose  
- Nodemailer  
- CORS  
- Express Rate Limit  
- dotenv  

# Additional Information
- Built with React, TypeScript, Node.js/Express, and MongoDB.  
- Multilingual system with `LanguageContext`.  
- Email sending handled via `Nodemailer`.  
- Optimized for SEO and mobile devices.  
- Contact form protected with Express Rate Limiter.  

# User Story Map

## Core Functions:

| Function                               | User | Site Owner |
|----------------------------------------|------|------------|
| **View homepage**                      | ✅   | ✅         |
| **View "About Me" section**            | ✅   | ✅         |
| **View project list**                  | ✅   | ✅         |
| **Send a message via contact form**    | ✅   | ✅         |
| **Receive an email (new request)**     | ❌   | ✅         |
| **Switch site language (EN/LT)**       | ✅   | ✅         |

---

### User:
1. As a visitor, I want to view the project list to see the author’s work.  
2. As a visitor, I want to read the personal information in the "About Me" section.  
3. As a visitor, I want to fill in the contact form to get in touch with the site owner.  
4. As a visitor, I want to switch the site language between English and Lithuanian so the content is understandable.  

### Site Owner (Admin):
1. As the site owner, I want to receive an email whenever a user submits the contact form.  
2. As the site owner, I want to protect the contact form from spam using a Rate Limiter.  
