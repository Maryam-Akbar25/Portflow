from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User as DjangoUser
from .models import User, Role
import hashlib
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Authenticate user and return user data with role
    """
    try:
        data = request.data
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return Response({
                'error': 'Email and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Find user by email
        try:
            user = User.objects.get(email=email, isDeleted=False)
        except User.DoesNotExist:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Verify password
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        if user.passwordHash != password_hash:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Return user data with role
        return Response({
            'success': True,
            'user': {
                'id': user.userId,
                'username': user.username,
                'email': user.email,
                'role': user.role.roleName,
                'roleId': user.role.roleId
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': 'Login failed',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user
    """
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role_name = data.get('role')
        
        if not all([username, email, password, role_name]):
            return Response({
                'error': 'All fields are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({
                'error': 'User with this email already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({
                'error': 'Username already taken'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get role
        try:
            role = Role.objects.get(roleName=role_name)
        except Role.DoesNotExist:
            return Response({
                'error': 'Invalid role'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Hash password
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        # Create user
        user = User.objects.create(
            username=username,
            email=email,
            passwordHash=password_hash,
            role=role
        )
        
        return Response({
            'success': True,
            'user': {
                'id': user.userId,
                'username': user.username,
                'email': user.email,
                'role': user.role.roleName,
                'roleId': user.role.roleId
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': 'Registration failed',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_roles(request):
    """
    Get all available roles (for registration only)
    """
    try:
        roles = Role.objects.filter(isDeleted=False)
        role_data = [{'id': role.roleId, 'name': role.roleName} for role in roles]
        
        return Response({
            'success': True,
            'roles': role_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': 'Failed to fetch roles',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)