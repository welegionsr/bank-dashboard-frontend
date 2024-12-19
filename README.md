
# Bank Dashboard Frontend

This project is the frontend for a mock banking application, developed to practice modern web development frameworks and tools. It features user-friendly interfaces for authentication and transaction management.

## Features

- **Responsive Design**: Ensures compatibility across various devices and screen sizes.
- **User Authentication**: Interfaces for login and registration with validation feedback.
- **Transaction Management**: View and perform transactions through a clean and intuitive UI.
- **API Integration**: Seamless communication with the backend service.
- **React-Bootstrap**: Styled components for a polished and professional appearance.
- **Error Feedback**: Clear messages for user actions and error states.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering and static site generation.
- **React-Bootstrap**: Bootstrap components for styling.
- **Axios**: HTTP client for API requests.
- **ESLint & Prettier**: Tools for maintaining clean and consistent code.
- **Docker**: Containerization for development and deployment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Docker](https://www.docker.com/) installed (optional, for containerization).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/welegionsr/bank-dashboard-frontend.git
   cd bank-dashboard-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_BANK_API_BASE_URL=<backend_url>/api
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

   The app will run at `http://localhost:3001` (default).

### Using Docker

1. **Build the Docker image**:

   ```bash
   docker build -t bank-dashboard-frontend .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -d -p 3001:3000 --env-file .env.local bank-dashboard-frontend
   ```

   The application will be accessible at `http://localhost:3001`.

## API Dependency

This frontend depends on the [Bank Dashboard Backend](https://github.com/welegionsr/bank-dashboard). Make sure the backend is running and accessible at the URL defined in the `NEXT_PUBLIC_API_URL` environment variable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
# bank-dashboard-frontend
Frontend of the bank project
