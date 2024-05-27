from django.db import models
from django.core.validators import RegexValidator, EmailValidator, MinLengthValidator


# Create your models here.
class User(models.Model):
    ROLES = (
        ('Admin', 'Admin'),
        ('Radiologist', 'Radiologist'),
        ('Technician', 'Technician'),
        ('Viewer', 'Viewer'),
    )

    id = models.AutoField(primary_key=True)

    first_name = models.CharField(
        max_length=50, null=True,
        validators=[
            RegexValidator(
                regex='^[a-zA-Z]*$',
                message='First name must be alphabetic.',
                code='invalid_first_name'
            ),
        ])

    last_name = models.CharField(
        max_length=50, null=True,
        validators=[
            RegexValidator(
                regex='^[a-zA-Z]*$',
                message='Last name must be alphabetic.',
                code='invalid_last_name'
            ),
        ])

    username = models.CharField(
        max_length=20,
        unique=True,
        null=False,
        validators=[
            RegexValidator(
                regex='^[a-zA-Z0-9]*$',
                message='Username must be alphanumeric.',
                code='invalid_username'
            ),
            MinLengthValidator(
                limit_value=5,
                message='Username must be at least 3 characters long.'
            ),

        ]
    )

    email = models.CharField(
        max_length=50,
        unique=True,
        null=False,
        validators=[
            EmailValidator(message='Enter a valid email address.'),
        ]
    )

    role = models.CharField(
        max_length=15,
        null=False,
        choices=ROLES,
    )

    department = models.CharField(max_length=100, blank=True)

    password = models.CharField(
        max_length=120,
        null=False,
        validators=[
            MinLengthValidator(
                limit_value=8,
                message='Password must be at least 8 characters long.'
            ),
        ]
    )

    passwordChangedAt = models.DateTimeField(
        auto_now=True,
    )

    passwordResetToken = models.CharField(null=True)
    lastPasswordChange = models.DateTimeField(null=True)
    active = models.BooleanField(default=True)

    lastLogin = models.DateTimeField(null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
