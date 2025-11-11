import csv
from django.http import HttpResponse
from rest_framework.decorators import api_view
from ships.models import Ship
from ports.models import Berth
from operations.models import Schedule, BerthAssignment
from overrides.models import ManualOverrideLogs


def generate_csv_response(data, filename, default_headers=None):
    """Helper function to generate CSV response"""
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    
    if not data:
        if default_headers:
            writer = csv.DictWriter(response, fieldnames=default_headers)
            writer.writeheader()
        else:
            writer = csv.writer(response)
            writer.writerow(['No data available'])
        return response
    
    writer = csv.DictWriter(response, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)
    
    return response


@api_view(['GET'])
def export_ships_csv(request):
    """Export all ships to CSV"""
    ships = Ship.objects.all().order_by('shipId')
    
    data = []
    for ship in ships:
        data.append({
            'Ship ID': ship.shipId,
            'Ship Name': ship.shipName,
            'MMSI': ship.MMSI or '',
            'Call Sign': ship.callSign or '',
            'Ship Type': ship.shipType or '',
            'Length (m)': str(ship.length) if ship.length else '',
            'Beam (m)': str(ship.beam) if ship.beam else '',
            'Draft (m)': str(ship.draft) if ship.draft else '',
            'Gross Tonnage': str(ship.grossTonnage) if ship.grossTonnage else '',
            'Cargo Type': ship.cargoType or '',
            'Nationality': ship.nationality or '',
            'Priority Level': ship.priorityLevel,
            'Created At': ship.createdAt.strftime('%Y-%m-%d %H:%M:%S') if ship.createdAt else '',
            'Updated At': ship.updatedAt.strftime('%Y-%m-%d %H:%M:%S') if ship.updatedAt else '',
        })
    
    return generate_csv_response(data, 'all_ships_report.csv')


@api_view(['GET'])
def export_berths_csv(request):
    """Export all berths to CSV"""
    berths = Berth.objects.select_related('port').all().order_by('berthId')
    
    data = []
    for berth in berths:
        data.append({
            'Berth ID': berth.berthId,
            'Port Name': berth.port.portName if berth.port else '',
            'Berth Name': berth.berthName or '',
            'Length (m)': str(berth.length) if berth.length else '',
            'Width (m)': str(berth.width) if berth.width else '',
            'Max Draft (m)': str(berth.maxDraft) if berth.maxDraft else '',
            'Max Ship Capacity': berth.maxShipCapacity or '',
            'Availability Status': berth.availabilityStatus,
            'Preferred Ship Type': berth.preferredShipType or '',
            'Loading Rate': str(berth.loadingRate) if berth.loadingRate else '',
            'Crane Count': berth.craneCount or '',
            'Crane Capacity': str(berth.craneCapacity) if berth.craneCapacity else '',
            'Created At': berth.createdAt.strftime('%Y-%m-%d %H:%M:%S') if berth.createdAt else '',
            'Updated At': berth.updatedAt.strftime('%Y-%m-%d %H:%M:%S') if berth.updatedAt else '',
        })
    
    return generate_csv_response(data, 'all_berths_report.csv')


@api_view(['GET'])
def export_assignments_csv(request):
    """Export all ship to berth assignments to CSV"""
    assignments = BerthAssignment.objects.select_related('ship', 'berth', 'berth__port').all().order_by('assignmentId')
    
    data = []
    for assignment in assignments:
        data.append({
            'Assignment ID': assignment.assignmentId,
            'Ship Name': assignment.ship.shipName if assignment.ship else 'N/A',
            'Ship ID': assignment.ship.shipId if assignment.ship else '',
            'Berth Name': assignment.berth.berthName if assignment.berth else 'N/A',
            'Port Name': assignment.berth.port.portName if assignment.berth and assignment.berth.port else 'N/A',
            'Assigned By': assignment.assignedBy or '',
            'Status': assignment.status,
            'ETA': assignment.ETA.strftime('%Y-%m-%d %H:%M:%S') if assignment.ETA else '',
            'ATA': assignment.ATA.strftime('%Y-%m-%d %H:%M:%S') if assignment.ATA else '',
            'ETD': assignment.ETD.strftime('%Y-%m-%d %H:%M:%S') if assignment.ETD else '',
            'ATD': assignment.ATD.strftime('%Y-%m-%d %H:%M:%S') if assignment.ATD else '',
            'Created At': assignment.createdAt.strftime('%Y-%m-%d %H:%M:%S') if assignment.createdAt else '',
            'Updated At': assignment.updatedAt.strftime('%Y-%m-%d %H:%M:%S') if assignment.updatedAt else '',
        })
    
    return generate_csv_response(data, 'ship_to_berth_assignments_report.csv')


@api_view(['GET'])
def export_schedules_csv(request):
    """Export all ship schedules to CSV"""
    schedules = Schedule.objects.select_related('ship', 'berth', 'berth__port').all().order_by('scheduleId')
    
    data = []
    for schedule in schedules:
        data.append({
            'Schedule ID': schedule.scheduleId,
            'Ship Name': schedule.ship.shipName if schedule.ship else 'N/A',
            'Ship ID': schedule.ship.shipId if schedule.ship else '',
            'Berth Name': schedule.berth.berthName if schedule.berth else 'N/A',
            'Port Name': schedule.berth.port.portName if schedule.berth and schedule.berth.port else 'N/A',
            'Destination Port': schedule.destinationPort or '',
            'ETA': schedule.ETA.strftime('%Y-%m-%d %H:%M:%S') if schedule.ETA else '',
            'ATA': schedule.ATA.strftime('%Y-%m-%d %H:%M:%S') if schedule.ATA else '',
            'ETD': schedule.ETD.strftime('%Y-%m-%d %H:%M:%S') if schedule.ETD else '',
            'ATD': schedule.ATD.strftime('%Y-%m-%d %H:%M:%S') if schedule.ATD else '',
            'Created At': schedule.createdAt.strftime('%Y-%m-%d %H:%M:%S') if schedule.createdAt else '',
            'Updated At': schedule.updatedAt.strftime('%Y-%m-%d %H:%M:%S') if schedule.updatedAt else '',
        })
    
    return generate_csv_response(data, 'ship_schedules_report.csv')


@api_view(['GET'])
def export_overrides_csv(request):
    """Export all manual override logs to CSV"""
    overrides = ManualOverrideLogs.objects.select_related('user', 'ship', 'berth', 'berth__port').all().order_by('logId')
    
    data = []
    for override in overrides:
        data.append({
            'Log ID': override.logId,
            'User Name': override.user.username if override.user else 'N/A',
            'User ID': override.user.userId if override.user else '',
            'Ship Name': override.ship.shipName if override.ship else 'N/A',
            'Ship ID': override.ship.shipId if override.ship else '',
            'Berth Name': override.berth.berthName if override.berth else 'N/A',
            'Port Name': override.berth.port.portName if override.berth and override.berth.port else 'N/A',
            'Override Reason': override.overrideReason or '',
            'Timestamp': override.timestamp.strftime('%Y-%m-%d %H:%M:%S') if override.timestamp else '',
        })
    
    return generate_csv_response(data, 'manual_override_reports.csv')

