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

The project includes a management command for seeding authentication data (roles and users):

1. **Run the seed command:**
   ```bash
   python manage.py seed_auth_data
   ```

   This command will:
   - Create three roles: Admin, Manager, Operator
   - Create three sample users:
     - `admin` / `admin123` (Admin role)
     - `manager` / `manager123` (Manager role)
     - `operator` / `operator123` (Operator role)

2. **For additional data** (ports, berths, ships), use the Django Admin panel or create additional management commands following the same pattern.

   Example structure for creating ports and berths:
   ```python
   from ports.models import Port, Berth
   
   # Create port
   port = Port.objects.create(
       portName='Port of Singapore',
       location='Singapore'
   )
   
   # Create berth
   berth = Berth.objects.create(
       port=port,
       berthName='Berth 1',
       availabilityStatus='available'
   )
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
# Test health endpoint
curl http://localhost:8000/api/health

# Test users endpoint
curl http://localhost:8000/api/v1/users/

# Test ports endpoint
curl http://localhost:8000/api/v1/ports/

# Test ships endpoint
curl http://localhost:8000/api/v1/ships/

# Test roles endpoint
curl http://localhost:8000/api/v1/roles/
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
This setup will give you a fully functional database with sample data for development and testing.
