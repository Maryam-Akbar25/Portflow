from django.urls import path
from . import views

urlpatterns = [
    path('reports/ships/csv/', views.export_ships_csv, name='export_ships_csv'),
    path('reports/berths/csv/', views.export_berths_csv, name='export_berths_csv'),
    path('reports/assignments/csv/', views.export_assignments_csv, name='export_assignments_csv'),
    path('reports/schedules/csv/', views.export_schedules_csv, name='export_schedules_csv'),
    path('reports/overrides/csv/', views.export_overrides_csv, name='export_overrides_csv'),
]

