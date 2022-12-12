from django.urls import path
from  .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',list),
    path('files',FilesView,name = 'files'),
    path('addfiles',PostFiles,name = 'addfiles'),
    path('msg',MessageView,name = 'msg'),
    path('addmsg',MessagePost,name = 'addmsg'),
    path('getNo',GetNo,name = 'getNo'),
    path('deletemsg/<int:pk>',MessageDelete,name = 'deletemsg'),
    path('deletefile/<int:pk>',FilesDelete,name = 'deletefile'),
]