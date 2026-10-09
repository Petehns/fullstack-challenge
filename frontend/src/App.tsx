import { useState } from 'react'
import './App.css'
import styles from './App.module.css';
import { ParticipantForm } from './components/ParticipantForm';
import type { NewParticipant } from './types';
import { ParticipantsTable } from './components/ParticipantsTable';
import { ParticipationChart } from './components/ParticipationChart';

function App() {
  const [participants, setParticipants] = useState<NewParticipant[]>([]);

  function handleAdd(participant: NewParticipant) {
    setParticipants((prev) => [...prev, participant]);
  }

  return (
    <div className={styles.page}>
      <ParticipantForm onAdd={handleAdd} />

      <div className={styles.intro}>
        <h1 className={styles.title}>DATA</h1>
        <p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className={styles.content}>
        <ParticipantsTable participants={participants} />
        <ParticipationChart participants={participants} />
      </div>
    </div>
  );
}

export default App
