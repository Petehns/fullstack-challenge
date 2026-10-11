from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator #aq eu importei os validadores de valor minimo e maximo para o campo participation

class Participant(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    participation = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)]) #aplicacao dos validadores
    def __str__(self):
        return self.firstName
