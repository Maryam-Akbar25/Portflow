# PortFlow Frontend

This is the frontend application for PortFlow, built with React.js and modern web technologies.

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or later
- npm 8 or later or yarn
- Backend API server (see [Backend README](../Backend/README.md))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portflow/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   The application will be available at `http://localhost:3000`

## 🛠 Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from create-react-app (irreversible)
- `npm run install:clean` - Clean install (removes node_modules and reinstalls)

## 📁 Project Structure

```
Frontend/
├── public/              # Static files (favicon, manifest, etc.)
├── src/
│   ├── assets/          # Images, theme files, fonts
│   │   ├── images/     # Image assets
│   │   └── theme/       # Material-UI theme configuration
│   ├── components/      # Reusable UI components (Alert, Avatar, Button, etc.)
│   ├── context/         # React Context API for state management
│   ├── examples/        # Example components (Cards, Charts, Navbars, etc.)
│   ├── layouts/         # Layout components (Dashboard, Admin, Reports, etc.)
│   ├── utils/           # Utility functions (API calls, helpers)
│   ├── variables/       # Chart variables and configurations
│   ├── App.js           # Main App component
│   ├── routes.js        # Route configuration
│   └── index.js         # Entry point
└── package.json         # Dependencies and scripts
```

## 🌐 API Configuration

The API base URL is configured in `src/utils/api.js` and is currently set to:
- **API Base URL**: `http://127.0.0.1:8000/api/v1`

To change the API URL, modify the `API_BASE_URL` constant in `src/utils/api.js`.

> **Note**: For production, consider using environment variables or a configuration file.

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

This will create a `build` directory with optimized production build.

## 📦 Dependencies

### Core
- **React** 18.2.0 - UI library
- **React Router DOM** 7.6.0 - Routing
- **React DOM** 18.2.0 - React rendering

### UI Framework
- **Material-UI (MUI)** 5.9.2 - Component library
- **@emotion/react** & **@emotion/styled** - CSS-in-JS styling
- **React Icons** 4.3.1 - Icon library

### Data Visualization
- **ApexCharts** 3.30.0 - Chart library
- **React ApexCharts** 1.3.9 - React wrapper for ApexCharts

### Utilities
- **chroma-js** 2.1.2 - Color manipulation
- **react-flatpickr** 3.10.7 - Date picker
- **uuid** 8.3.2 - Unique ID generation

## 🤝 Contributing

Please follow the contribution guidelines in the main [README](../README.md).

## 📄 License

This project is licensed under the MIT License.