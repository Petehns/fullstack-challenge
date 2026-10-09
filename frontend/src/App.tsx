import { useState } from 'react'
import './App.css'
import styles from './App.module.css';
import { ParticipantForm } from './components/ParticipantForm';
import type { NewParticipant } from './types';

function App() {
  const [participants, setParticipants] = useState<NewParticipant[]>([])

  function handleAdd(participant: NewParticipant) {
    setParticipants([...participants, participant]); // copia a lista e adiciona o novo
  }

  return (
    
 <>

<ParticipantForm onAdd={handleAdd} />

  <h1 className={styles.title}>DATA</h1>
  <p className={styles.subtitle}>This is a fullstack challenge</p>
</>
  )
}

export default App
