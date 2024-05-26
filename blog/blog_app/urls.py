from django.urls import path
from . import views  # Import views module from the current package
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

# urlpatterns = [
#     path('', views.Home, name='Home'),  # Use views.home instead of views.home
# ]

from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register('project',ProjectViewSet,basename='project'),
router.register('projectmanager',ProjectManagerViewSet,basename='projectmanager'),
router.register(r'yourmodels', YourModelViewSet),
router.register(r'images', ImageViewSet),

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('logout/', UserLogoutAPIView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user/", UserInfoAPIView.as_view(), name="user-info")
]



urlpatterns += router.urls
    

