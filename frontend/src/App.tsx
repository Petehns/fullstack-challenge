import { useState, useEffect } from 'react'
import './App.css'
import styles from './App.module.css';
import { ParticipantForm } from './components/ParticipantForm';
import type { NewParticipant, Participant } from './types';
import { ParticipantsTable } from './components/ParticipantsTable';
import { ParticipationChart } from './components/ParticipationChart';

const API_URL = 'http://localhost:8000/participants/';

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  // ao abrir a página, busca os participantes salvos no backend (tipo o .task {} do SwiftUI)
  useEffect(() => {
    async function loadParticipants() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          console.error('Erro ao carregar participantes:', resposta.statusText);
          return;
        }
        setParticipants(await resposta.json());
      } catch (erro) {
        console.error('Backend fora do ar ou bloqueado (CORS):', erro);
      }
    }
    loadParticipants();
  }, []);

  async function handleAdd(participant: NewParticipant) {  /* adicionei o async e await para a coumunicacao*/
    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participant),
      });

      if (!resposta.ok) {
        console.error('Erro ao adicionar participante:', resposta.statusText);
        return;
      }
      const salvo: Participant = await resposta.json(); // o backend devolve o participante já com id
      setParticipants((prev) => [...prev, salvo]);
    } catch (erro) {
      console.error('Backend fora do ar ou bloqueado (CORS):', erro);
    }
  }

  async function handleDelete(id: number) {
    try {
      const resposta = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });

      if (!resposta.ok) {
        console.error('Erro ao remover participante:', resposta.statusText);
        return;
      }
      setParticipants((prev) => prev.filter((p) => p.id !== id)); // tira da lista só o removido
    } catch (erro) {
      console.error('Backend fora do ar ou bloqueado (CORS):', erro);
    }
  }

  return (
    <div className={styles.page}>
      <ParticipantForm onAdd={handleAdd} />

      <div className={styles.intro}>
        <h1 className={styles.title}>Lista de Participantes</h1>
        <p className={styles.subtitle}>Esta lista tem {participants.length} {participants.length === 1 ? 'pessoa adicionada' : 'pessoas adicionadas'}.</p>
      </div>

      <div className={styles.content}>
        <ParticipantsTable participants={participants} onDelete={handleDelete} />
        <ParticipationChart participants={participants} />
      </div>
    </div>
  );
}

export default App
