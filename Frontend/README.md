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

3. **Environment Setup**
   Create a `.env` file in the Frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_NAME=PortFlow
   REACT_APP_VERSION=1.0.0
   ```

4. **Start the development server**
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

## 📁 Project Structure

```
Frontend/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── utils/           # Utility functions
│   ├── App.js           # Main App component
│   └── index.js         # Entry point
├── .env                 # Environment variables
└── package.json         # Dependencies and scripts
```

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8000` |
| `REACT_APP_NAME` | Application name | `PortFlow` |
| `REACT_APP_VERSION` | Application version | `1.0.0` |

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

- React 18
- React Router DOM
- Axios
- Redux Toolkit
- Material-UI (MUI)
- React Icons
- Formik & Yup (Form handling)
- Chart.js (Data visualization)

## 🤝 Contributing

Please follow the contribution guidelines in the main [README](../README.md).

## 📄 License

This project is licensed under the MIT License.