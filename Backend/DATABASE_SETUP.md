# Database Setup Guide

This guide will help you set up the PostgreSQL database for the PortFlow backend.

## 📋 Prerequisites

- PostgreSQL 12 or higher installed
- psql command-line tool
- Admin access to PostgreSQL

## 🚀 Step-by-Step Setup

### Step 1: Install PostgreSQL

#### Windows

1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Set password for `postgres` user
4. Add PostgreSQL to PATH during installation

#### macOS

```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 2: Access PostgreSQL

```bash
# Connect as postgres user
psql -U postgres

# Or on Windows (if not in PATH)
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
```

### Step 3: Create Database and User

Run these commands in the PostgreSQL prompt:

```sql
-- Create database
CREATE DATABASE portflow;

-- Create user
CREATE USER portflow_user WITH PASSWORD '123456';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE portflow TO portflow_user;

-- Connect to the database
\c portflow

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO portflow_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO portflow_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO portflow_user;

-- Exit psql
\q
```

### Step 4: Verify Database Connection

Test the connection:

```bash
# Test connection
psql -U portflow_user -d portflow -h localhost

# You should see:
# portflow=>
```

### Step 5: Run Django Migrations

```bash
# Navigate to backend directory
cd Backend

# Activate virtual environment
.\.venv\Scripts\Activate.ps1  # Windows
# source .venv/bin/activate    # macOS/Linux

# Run migrations
python manage.py migrate
```

### Step 6: Create Superuser

```bash
python manage.py createsuperuser

# Follow prompts:
# Username: admin
# Email: admin@portflow.com
# Password: (choose secure password)
# Password (again): (repeat password)
```

## 📊 Manual Data Seeding

### Method 1: Using Django Admin

1. **Access Admin Panel**

   - Go to `http://localhost:8000/admin/`
   - Login with superuser credentials

2. **Add Sample Data**

   **Users:**

   - Go to Users → Add User
   - Create users with different roles (Admin, Manager, Operator)

   **Ports:**

   - Go to Ports → Add Port
   - Add sample ports (e.g., "Port of Singapore", "Port of Rotterdam")

   **Berths:**

   - Go to Berths → Add Berth
   - Add berths for each port (e.g., Berth 1, Berth 2, etc.)

   **Ships:**

   - Go to Ships → Add Ship
   - Add sample ships with MMSI numbers

### Method 2: Using Django Management Commands

Create a management command for data seeding:

1. **Create management command file:**

   ```
   Backend/users/management/
   Backend/users/management/commands/
   Backend/users/management/commands/seed_data.py
   ```

2. **Add this code to seed_data.py:**

   ```python
   from django.core.management.base import BaseCommand
   from django.contrib.auth.models import User
   from ports.models import Port, Berth
   from ships.models import Ship
   from operations.models import Schedule

   class Command(BaseCommand):
       help = 'Seed database with sample data'

       def handle(self, *args, **options):
           # Create users
           admin_user = User.objects.create_user(
               username='admin',
               email='admin@portflow.com',
               password='admin123',
               is_staff=True,
               is_superuser=True
           )

           manager_user = User.objects.create_user(
               username='manager',
               email='manager@portflow.com',
               password='manager123'
           )

           operator_user = User.objects.create_user(
               username='operator',
               email='operator@portflow.com',
               password='operator123'
           )

           # Create ports
           port1 = Port.objects.create(
               name='Port of Singapore',
               location='Singapore',
               country='Singapore',
               latitude=1.2966,
               longitude=103.7764
           )

           port2 = Port.objects.create(
               name='Port of Rotterdam',
               location='Rotterdam',
               country='Netherlands',
               latitude=51.9225,
               longitude=4.4792
           )

           # Create berths
           for i in range(1, 6):
               Berth.objects.create(
                   port=port1,
                   berth_number=f'B{i}',
                   capacity=50000,
                   availability_status='available'
               )

           for i in range(1, 4):
               Berth.objects.create(
                   port=port2,
                   berth_number=f'R{i}',
                   capacity=75000,
                   availability_status='available'
               )

           # Create ships
           ships_data = [
               {'name': 'MV Ocean Star', 'mmsi': '123456789', 'length': 200, 'width': 30},
               {'name': 'MV Sea Breeze', 'mmsi': '987654321', 'length': 180, 'width': 28},
               {'name': 'MV Wind Spirit', 'mmsi': '456789123', 'length': 220, 'width': 32},
           ]

           for ship_data in ships_data:
               Ship.objects.create(**ship_data)

           self.stdout.write(
               self.style.SUCCESS('Successfully seeded database with sample data')
           )
   ```

3. **Run the command:**
   ```bash
   python manage.py seed_data
   ```

### Method 3: Using Fixtures

1. **Create fixture file:**

   ```bash
   python manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission > sample_data.json
   ```

2. **Load fixture:**
   ```bash
   python manage.py loaddata sample_data.json
   ```

## 🔍 Verify Setup

### Check Database Tables

```sql
-- Connect to database
psql -U portflow_user -d portflow

-- List all tables
\dt

-- Check specific table data
SELECT * FROM ports_port LIMIT 5;
SELECT * FROM ships_ship LIMIT 5;
SELECT * FROM auth_user LIMIT 5;
```

### Test API Endpoints

```bash
# Test users endpoint
curl http://localhost:8000/api/users/

# Test ports endpoint
curl http://localhost:8000/api/ports/

# Test ships endpoint
curl http://localhost:8000/api/ships/
```

## 🐛 Troubleshooting

### Common Issues

1. **Permission Denied**

   ```sql
   -- Grant all privileges
   GRANT ALL PRIVILEGES ON DATABASE portflow TO portflow_user;
   GRANT ALL ON SCHEMA public TO portflow_user;
   ```

2. **Connection Refused**

   - Check if PostgreSQL service is running
   - Verify host and port in settings.py
   - Check firewall settings

3. **Migration Errors**

   ```bash
   # Reset migrations (CAUTION: This will delete data)
   python manage.py migrate --fake-initial

   # Or delete migration files and recreate
   rm -rf */migrations/0001_initial.py
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Database Does Not Exist**
   ```sql
   -- Create database
   CREATE DATABASE portflow;
   ```

### Useful Commands

```bash
# Check database connection
python manage.py dbshell

# Show migration status
python manage.py showmigrations

# Reset database (CAUTION: Deletes all data)
python manage.py flush

# Create new migration
python manage.py makemigrations app_name
```

## 📝 Sample Data Structure

### Users

- **Admin**: Full system access
- **Manager**: Port management access
- **Operator**: Daily operations access

### Ports

- Port of Singapore (5 berths)
- Port of Rotterdam (3 berths)
- Port of Hamburg (4 berths)

### Ships

- Various ship types with different specifications
- MMSI numbers for identification
- Length and width measurements

### Schedules

- Sample arrival/departure schedules
- Different ship assignments
- Various time slots

## 🔄 Backup and Restore

### Backup Database

```bash
# Create backup
pg_dump -U portflow_user -h localhost portflow > backup.sql

# Restore from backup
psql -U portflow_user -d portflow < backup.sql
```

### Django Data Backup

```bash
# Export data
python manage.py dumpdata > data_backup.json

# Import data
python manage.py loaddata data_backup.json
```

This setup will give you a fully functional database with sample data for development and testing.
