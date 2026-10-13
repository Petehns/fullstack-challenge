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
  const [erro, setErro] = useState("")

  function mostrarErro(mensagem: string) {
    setErro(mensagem);
    setTimeout(() => setErro(""), 5000);
  }

  useEffect(() => {
    async function loadParticipants() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          console.error('Erro ao carregar participantes:', resposta.statusText);
          mostrarErro('Não foi possível carregar os participantes.');
          return;
        }
        setParticipants(await resposta.json());
      } catch (erro) {
        console.error('Backend fora do ar ou bloqueado (CORS):', erro);
        mostrarErro('Não foi possível conectar ao servidor.');
      }
    }
    loadParticipants();
  }, []);

  async function handleAdd(participant: NewParticipant) {
    try {
    
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participant),
      });

      if (!resposta.ok) {
        const corpo: Record<string, string[]> = await resposta.json();

        console.error('Erro ao adicionar participante: ', resposta.statusText);
        mostrarErro(Object.values(corpo).flat().join(' '));
        return;
      }
      const salvo: Participant = await resposta.json();
      setParticipants((prev) => [...prev, salvo]);
    } catch (erro) {
      console.error('Backend fora do ar ou bloqueado (CORS):', erro);
      mostrarErro('Não foi possível conectar ao servidor.');
    }
  }

  async function handleDelete(id: number) {
    try {
      const resposta = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });

      if (!resposta.ok) {
        const corpo: Record<string, string | string[]> = await resposta.json();

        console.error('Erro ao remover participante:', resposta.statusText);
        mostrarErro(Object.values(corpo).flat().join(' '));
        return;
      }
      setParticipants((prev) => prev.filter((p) => p.id !== id));
    } catch (erro) {
      console.error('Backend fora do ar ou bloqueado (CORS):', erro);
      mostrarErro('Não foi possível conectar ao servidor.');
    }
  }

  return (
    <div className={styles.page}>
     <ParticipantForm onAdd={handleAdd} erro={erro} setErro={setErro} />

      <div className={styles.intro}>
        <h1 className={styles.title}>Lista de Participantes</h1>
        <p className={styles.subtitle}>Esta lista tem {participants.length} {participants.length === 1 ? 'pessoa adicionada' : 'pessoas adicionadas'} e um total de {participants.reduce((sum, p) => sum + p.participation, 0)}% em participações.</p>
      </div>

      <div className={styles.content}>
        <ParticipantsTable participants={participants} onDelete={handleDelete} />
        <ParticipationChart participants={participants} />
      </div>
    </div>
  );
}

export default App
