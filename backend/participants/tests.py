from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Participant
from django.db.models import Sum


class ParticipantTests(APITestCase):
    def test_criar_participante(self):
        dados = {"firstName": "Ana", "lastName": "Silva", "participation": 30}
        resposta = self.client.post("/participants/", dados)

        self.assertEqual(resposta.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Participant.objects.count(), 1)
    
    def test_rejeita_participantes_acima_de_100(self):
        dados = {"firstName": "João", "lastName": "Pereira", "participation": 150}
        resposta = self.client.post("/participants/", dados)

        self.assertEqual(resposta.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Participant.objects.count(), 0)

    def test_soma_participantes(self):
        dados1 = {"firstName": "Ana", "lastName": "Silva", "participation": 30}
        dados2 = {"firstName": "João", "lastName": "Pereira", "participation": 50}
        self.client.post("/participants/", dados1)
        self.client.post("/participants/", dados2)

        soma = Participant.objects.aggregate(total=Sum('participation'))['total']
        self.assertEqual(soma, 80)

    def test_rejeita_soma_acima_de_100(self):
        Participant.objects.create(firstName="Ana", lastName="Silva", participation=60)

        dados = {"firstName": "Beto", "lastName": "Costa", "participation": 50}
        resposta = self.client.post("/participants/", dados)

        self.assertEqual(resposta.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Participant.objects.count(), 1)

    def test_listar_participantes(self):
        Participant.objects.create(firstName="Ana", lastName="Silva", participation=30)
        Participant.objects.create(firstName="Beto", lastName="Costa", participation=40)

        resposta = self.client.get("/participants/")

        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resposta.data), 2)

    def test_apagar_participante(self):
        participante = Participant.objects.create(firstName="Ana", lastName="Silva", participation=30)

        resposta = self.client.delete(f"/participants/{participante.id}/")

        self.assertEqual(resposta.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Participant.objects.count(), 0)