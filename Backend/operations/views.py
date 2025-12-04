from rest_framework import viewsets, views
from rest_framework.response import Response
import csv
import os
from .models import Schedule, BerthAssignment
from .serializers import ScheduleSerializer, BerthAssignmentSerializer
from .ai_service import AIModelService
from ports.models import Berth
from django.http import HttpResponse

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.select_related("ship", "berth").all()
    serializer_class = ScheduleSerializer

class BerthAssignmentViewSet(viewsets.ModelViewSet):
    queryset = BerthAssignment.objects.select_related("ship", "berth").all()
    serializer_class = BerthAssignmentSerializer

    def perform_create(self, serializer):
        assignment = serializer.save()
        if assignment.berth:
            assignment.berth.availabilityStatus = 'occupied'
            assignment.berth.save()

    def perform_update(self, serializer):
        instance = self.get_object()
        old_berth = instance.berth
        
        assignment = serializer.save()
        new_berth = assignment.berth

        if old_berth != new_berth:
            if old_berth:
                old_berth.availabilityStatus = 'available'
                old_berth.save()
            
            if new_berth:
                new_berth.availabilityStatus = 'occupied'
                new_berth.save()

class OptimizeAllocationsView(views.APIView):
    def get(self, request):
        csv_path = r"d:\fyp\Portflow\Models\preprocessed_data.csv"
        data = []
        if os.path.exists(csv_path):
            with open(csv_path, mode='r', encoding='utf-8-sig') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    data.append(row)
        return Response(data)

class PredictAllocationsView(views.APIView):
    def get(self, request):
        try:
            service = AIModelService()
            data = service.predict()
            return Response(data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class DownloadPredictionsView(views.APIView):
    def get(self, request):
        try:
            service = AIModelService()
            data = service.predict()
            
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="ai_allocations_report.csv"'
            
            if not data:
                return response

            fieldnames = list(data[0].keys())
            writer = csv.DictWriter(response, fieldnames=fieldnames)
            writer.writeheader()
            for row in data:
                writer.writerow(row)
                
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=500)