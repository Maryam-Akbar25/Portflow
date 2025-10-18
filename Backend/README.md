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
├── manage.py             # Django management script
└── db.sqlite3            # SQLite backup database
```

## 🔧 API Endpoints

### Users

- `GET /api/users/` - List all users
- `POST /api/users/` - Create new user
- `GET /api/users/{id}/` - Get user details

### Ports

- `GET /api/ports/` - List all ports
- `POST /api/ports/` - Create new port
- `GET /api/ports/{id}/` - Get port details
- `GET /api/berths/` - List all berths
- `POST /api/berths/` - Create new berth

### Ships

- `GET /api/ships/` - List all ships
- `POST /api/ships/` - Create new ship
- `GET /api/ships/{id}/` - Get ship details

### Operations

- `GET /api/schedules/` - List all schedules
- `POST /api/schedules/` - Create new schedule
- `GET /api/schedules/{id}/` - Get schedule details

### Analytics

- `GET /api/analytics/` - Get analytics data
- `GET /api/reports/` - Generate reports

## 🛠️ Development Commands

### Database Operations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data
python manage.py loaddata sample_data.json
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

- **User**: System users (Admin, Manager, Operator)
- **Port**: Port information and configuration
- **Berth**: Individual berth details within ports
- **Ship**: Ship information and specifications
- **Schedule**: Ship arrival/departure scheduling
- **Override**: Manual override records
- **Analytics**: Performance metrics and reports

## 🌐 CORS Configuration

The API is configured to accept requests from:

- `http://localhost:3000` (React development server)
- `http://127.0.0.1:3000`

## 📝 Environment Variables

Create a `.env` file in the Backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=portflow
DB_USER=portflow_user
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

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
