from django.urls import path
from . import views  # Import views module from the current package
from .views import *

# urlpatterns = [
#     path('', views.Home, name='Home'),  # Use views.home instead of views.home
# ]

from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register('project',ProjectViewSet,basename='project'),
router.register(r'yourmodels', YourModelViewSet),
urlpatterns = router.urls
    

