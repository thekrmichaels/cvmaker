# CVMaker

CVMaker is a web application designed to generate ATS-friendly resumes dynamically. The project is built using React with Vite, and integrates various tools for authentication, theming, and UI components.

## Project Structure

### Entry Point

- **index.html**: The starting point of the application.
- **src/main.jsx**: The main application bootstrap.
- **src/App.jsx**: The main container for routing and state management.

### Configuration & Build

- **vite.config.js**: Configuration file for Vite.
- **package.json**: Manages dependencies and scripts.
- **.nvmrc**: Specifies the Node.js version.
- **postcss.config.js**: Configuration for PostCSS.
- **tailwind.config.js**: Tailwind CSS configuration file.

### Context Providers

- **AuthProvider.jsx**: Manages authentication with Auth0.
- **ThemeProvider.jsx**: Handles light/dark mode theming.
- **useContexts.jsx**: A custom hook for accessing theme and authentication contexts.

### Routing

- **Home.jsx**: The main landing page of the application.
- **Pricing.jsx**: Displays different pricing plans for premium features.

### UI Components

- **GoogleSignInButton.jsx**: Handles Google authentication.
- **GoogleSignInButton.css**: Styles for the Google Sign-In button.
- **ResumeForm.jsx**: The form for inputting resume data.
- **UserDropdown.jsx**: Dropdown menu for user profile actions.

### Development Tools & CI/CD

- **.github/workflows/main.yml**: GitHub Actions workflow for CI/CD.
- **.prettierrc**: Prettier configuration for code formatting.
- **eslint.config.js**: ESLint configuration for linting.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (as specified in `.nvmrc`)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone https://github.com/thekrmichaels/cvmaker.git
cd cvmaker

# Install dependencies
npm install  # or yarn install
```

### Running the Development Server

```sh
npm run dev  # or yarn dev
```

### Building for Production

```sh
npm run build  # or yarn build
```

### Deployment

The project can be deployed on platforms like Vercel, Netlify, or GitHub Pages.

## License

This project is licensed under the MIT License.

---

For more details, check the repository: [CVMaker GitHub](https://github.com/thekrmichaels/cvmaker).
