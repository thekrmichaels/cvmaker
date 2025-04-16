# CVMaker

Web application designed with React that generates ATS-friendly resumes dynamically based on user information.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (check `.nvmrc` for the required version)
- [pnpm](https://pnpm.io/installation)

### Installation

```sh
# Clone the repository
git clone https://github.com/thekrmichaels/cvmaker.git

# Install dependencies
cd cvmaker
pnpm install
```

### Environment Configuration

Create a `.env` file in the root of your project with the following content before running the application (before, enable and configure Google Auth Provider in Supabase).

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=its_anon_key
VITE_CVMAKER_API="http://localhost:3000"
```

### Run the development server

```sh
pnpm dev
```

### Building and Previewing for production

```sh
pnpm build && pnpm preview
```
