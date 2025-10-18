from django.core.management.base import BaseCommand
from users.models import Role, User
import hashlib

class Command(BaseCommand):
    help = 'Seed authentication data'

    def handle(self, *args, **options):
        # Create roles
        roles_data = [
            {'roleName': 'Admin', 'description': 'Full system access'},
            {'roleName': 'Manager', 'description': 'Port management access'},
            {'roleName': 'Operator', 'description': 'Daily operations access'},
        ]
        
        for role_data in roles_data:
            role, created = Role.objects.get_or_create(
                roleName=role_data['roleName'],
                defaults=role_data
            )
            if created:
                self.stdout.write(f'Created role: {role.roleName}')
        
        # Create sample users
        users_data = [
            {
                'username': 'admin',
                'email': 'admin@portflow.com',
                'password': 'admin123',
                'role': 'Admin'
            },
            {
                'username': 'manager',
                'email': 'manager@portflow.com',
                'password': 'manager123',
                'role': 'Manager'
            },
            {
                'username': 'operator',
                'email': 'operator@portflow.com',
                'password': 'operator123',
                'role': 'Operator'
            },
        ]
        
        for user_data in users_data:
            role = Role.objects.get(roleName=user_data['role'])
            password_hash = hashlib.sha256(user_data['password'].encode()).hexdigest()
            
            user, created = User.objects.get_or_create(
                email=user_data['email'],
                defaults={
                    'username': user_data['username'],
                    'passwordHash': password_hash,
                    'role': role
                }
            )
            if created:
                self.stdout.write(f'Created user: {user.username} ({user.role.roleName})')
        
        self.stdout.write(
            self.style.SUCCESS('Successfully seeded authentication data')
        )