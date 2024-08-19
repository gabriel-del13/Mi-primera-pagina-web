from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Platform, Game, Stock
from .serializers import PlatformSerializer, GameSerializer, StockSerializer
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

class PlatformViewSet(viewsets.ModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = (MultiPartParser, FormParser)
    def perform_create(self, serializer):
        platform_ids = self.request.data.get('platform_ids', [])
        platforms = Platform.objects.filter(id__in=platform_ids)
        game = serializer.save()
        game.platforms.set(platforms)
    @action(detail=True, methods=['patch'])
    def update_image(self, request, pk=None):
        game = self.get_object()
        if 'image' in request.FILES:
            game.image = request.FILES['image']
            game.save()
            return Response({'status': 'image updated'}, status=status.HTTP_200_OK)
        return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer




