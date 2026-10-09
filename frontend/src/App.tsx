import { useState } from 'react'
import './App.css'
import styles from './App.module.css';
import { ParticipantForm } from './components/ParticipantForm';
import type { NewParticipant } from './types';
import { ParticipantsTable } from './components/ParticipantsTable';
import { ParticipationChart } from './components/ParticipationChart';

function App() {
  const [participants, setParticipants] = useState<NewParticipant[]>([])

  function handleAdd(participant: NewParticipant) {
    setParticipants([...participants, participant]); // copia a lista e adiciona o novo
  }

  return (
    
 <>

<ParticipantForm onAdd={handleAdd} />

<div className={styles.intro}>
  <h1 className={styles.title}>DATA</h1>
  <p className={styles.subtitle}>This is a fullstack challenge</p>
</div>
<div className={styles.content}>
<ParticipantsTable participants={participants} />
<ParticipationChart participants={participants} />
</div>
</>
  )
}

export default App
