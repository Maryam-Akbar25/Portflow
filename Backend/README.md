# PortFlow Backend API

A Django REST Framework API for port management and ship scheduling system.

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- PostgreSQL 12 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Portflow/Backend
   ```

2. **Create and activate virtual environment**

   ```bash
   # Windows
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1

   # macOS/Linux
   python -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up database**

   - Follow the detailed instructions in `DATABASE_SETUP.md`
   - Create PostgreSQL database and user
   - Run migrations

5. **Run the server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/`

## 📁 Project Structure

```
Backend/
├── config/                 # Django project settings
│   ├── settings.py         # Main configuration
│   ├── urls.py            # URL routing
│   └── wsgi.py            # WSGI configuration
├── users/                 # User management app
├── ports/                 # Port and berth management
├── ships/                 # Ship information
├── operations/            # Ship operations and scheduling
├── overrides/             # Manual override functionality
├── analytics/             # Analytics and reporting
├── reports/               # Reports and CSV exports
├── manage.py             # Django management script
└── requirements.txt     # Python dependencies
```

## 🔧 API Endpoints

All API endpoints are prefixed with `/api/v1/`

### Authentication

- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/register/` - User registration
- `GET /api/v1/auth/roles/` - Get available roles

### Users

- `GET /api/v1/users/` - List all users
- `POST /api/v1/users/` - Create new user
- `GET /api/v1/users/{id}/` - Get user details
- `PATCH /api/v1/users/{id}/` - Update user
- `DELETE /api/v1/users/{id}/` - Delete user

### Roles

- `GET /api/v1/roles/` - List all roles
- `POST /api/v1/roles/` - Create new role
- `GET /api/v1/roles/{id}/` - Get role details
- `PATCH /api/v1/roles/{id}/` - Update role
- `DELETE /api/v1/roles/{id}/` - Delete role

### Ports

- `GET /api/v1/ports/` - List all ports
- `POST /api/v1/ports/` - Create new port
- `GET /api/v1/ports/{id}/` - Get port details
- `PUT /api/v1/ports/{id}/` - Update port
- `DELETE /api/v1/ports/{id}/` - Delete port

### Berths

- `GET /api/v1/berths/` - List all berths
- `POST /api/v1/berths/` - Create new berth
- `GET /api/v1/berths/{id}/` - Get berth details
- `PATCH /api/v1/berths/{id}/` - Update berth
- `DELETE /api/v1/berths/{id}/` - Delete berth

### Ships

- `GET /api/v1/ships/` - List all ships
- `POST /api/v1/ships/` - Create new ship
- `GET /api/v1/ships/{id}/` - Get ship details
- `PATCH /api/v1/ships/{id}/` - Update ship
- `DELETE /api/v1/ships/{id}/` - Delete ship

### Operations

- `GET /api/v1/schedules/` - List all schedules
- `POST /api/v1/schedules/` - Create new schedule
- `GET /api/v1/schedules/{id}/` - Get schedule details
- `PUT /api/v1/schedules/{id}/` - Update schedule
- `DELETE /api/v1/schedules/{id}/` - Delete schedule

### Assignments

- `GET /api/v1/assignments/` - List all berth assignments
- `POST /api/v1/assignments/` - Create new assignment
- `GET /api/v1/assignments/{id}/` - Get assignment details
- `PUT /api/v1/assignments/{id}/` - Update assignment
- `DELETE /api/v1/assignments/{id}/` - Delete assignment

### Overrides

- `GET /api/v1/override-logs/` - List all override logs
- `POST /api/v1/override-logs/` - Create new override log
- `GET /api/v1/override-logs/{id}/` - Get override log details
- `PUT /api/v1/override-logs/{id}/` - Update override log
- `DELETE /api/v1/override-logs/{id}/` - Delete override log

### Analytics

- `GET /api/v1/ai-engines/` - List all AI engines
- `GET /api/v1/historical-data/` - List historical data
- `GET /api/v1/summary/` - Get dashboard summary

### Reports

- `GET /api/v1/reports/ships/csv/` - Export ships as CSV
- `GET /api/v1/reports/berths/csv/` - Export berths as CSV
- `GET /api/v1/reports/assignments/csv/` - Export assignments as CSV
- `GET /api/v1/reports/schedules/csv/` - Export schedules as CSV
- `GET /api/v1/reports/overrides/csv/` - Export overrides as CSV

### Health Check

- `GET /api/health` - API health check

## 🛠️ Development Commands

### Database Operations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Seed authentication data (roles and users)
python manage.py seed_auth_data
```

### Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test users
python manage.py test ports
```

### Django Admin

- Access at `http://localhost:8000/admin/`
- Use superuser credentials created with `createsuperuser`

## 📊 Database Models

### Core Models

- **Role**: User roles (Admin, Manager, Operator) with descriptions
- **User**: System users with role-based access control
- **Port**: Port information and configuration
- **Berth**: Individual berth details within ports (length, width, capacity, availability status)
- **Ship**: Ship information and specifications (MMSI, dimensions, cargo type, priority)
- **Schedule**: Ship arrival/departure scheduling (ETA, ATA, ETD, ATD)
- **BerthAssignment**: Ship to berth assignments with status tracking
- **ManualOverrideLogs**: Manual override records with timestamps and reasons
- **HistoricalData**: Historical performance data for analytics
- **AIEngine**: AI model configurations and training data
- **Dashboard**: User-specific dashboard configurations

## 🌐 CORS Configuration

The API is configured to accept requests from:

- `http://localhost:3000` (React development server)
- `http://127.0.0.1:3000`

## 📝 Configuration

Database configuration is currently set in `config/settings.py`. The default configuration uses:

- **Database**: PostgreSQL
- **Database Name**: `portflow`
- **Database User**: `portflow_user`
- **Database Password**: `123456` (change in production)
- **Database Host**: `localhost`
- **Database Port**: `5432`

> **Note**: For production, consider using environment variables or Django's `python-decouple` package to manage sensitive configuration.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Ensure PostgreSQL is running
   - Check database credentials in settings.py
   - Verify database exists

2. **Migration Errors**

   - Delete migration files and recreate
   - Check for model conflicts
   - Ensure all apps are in INSTALLED_APPS

3. **CORS Issues**
   - Add frontend URL to CORS_ALLOWED_ORIGINS
   - Check middleware order

### Getting Help

1. Check Django logs in terminal
2. Use Django debug toolbar (if installed)
3. Check PostgreSQL logs
4. Verify all dependencies are installed

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 👥 Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## 📄 License

This project is part of the PortFlow system for academic purposes.
