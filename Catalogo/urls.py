from django.urls import re_path, include
from rest_framework.routers import DefaultRouter
from .views import PlatformViewSet, GameViewSet, StockViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'platforms', PlatformViewSet)
router.register(r'games', GameViewSet)
router.register(r'stock', StockViewSet)

urlpatterns = [
    re_path('', include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)