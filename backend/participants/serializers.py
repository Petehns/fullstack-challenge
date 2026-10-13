from django.db.models import Sum
from rest_framework import serializers
from .models import Participant

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['id', 'firstName', 'lastName', 'participation']

    def validate_participation(self, value):
        others = Participant.objects.all()
        # if self.instance is not None:
        #     others = others.exclude(pk=self.instance.pk)

        current_total = others.aggregate(Sum('participation'))['participation__sum'] or 0

        if current_total + value > 100:
            available = 100 - current_total
            raise serializers.ValidationError(
                f"Total participation cannot exceed 100%. Only {available:g}% is still available."
            )
        return value
