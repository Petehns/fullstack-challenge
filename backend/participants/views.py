from rest_framework import generics
from .models import Participant
from .serializers import ParticipantSerializer


class ParticipantListCreateView(generics.ListCreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

class ParticipantDestroyView(generics.DestroyAPIView):
        queryset = Participant.objects.all()
        serializer_class = ParticipantSerializer
