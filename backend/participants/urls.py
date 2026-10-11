from django.urls import path
from .views import ParticipantListCreateView, ParticipantDestroyView

urlpatterns = [
    path('', ParticipantListCreateView.as_view()),  # /participants/
    path('<int:pk>/', ParticipantDestroyView.as_view()),  # /participants/<id>/
]
