// components/ParticipantForm.tsx

// 1. imports
import { useState } from 'react';
import type { NewParticipant } from '../types';
import styles from './ParticipantForm.module.css';

// 2. constantes de fora do componente (não mudam, não precisam ser recriadas a cada render)
const fields = [
  { name: 'firstName', placeholder: 'First name' },
  { name: 'lastName', placeholder: 'Last name' },
  { name: 'participation', placeholder: 'Participation' },
] as const;

type Props = {
  onAdd: (participant: NewParticipant) => void;
};

// 3. o componente (a "struct View")
export function ParticipantForm({ onAdd }: Props) {
  // 4. estado
  const [values, setValues] = useState({ firstName: '', lastName: '', participation: '' });

  // 5. funções
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }); // copia tudo e troca só o campo digitado
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onAdd({
      firstName: values.firstName,
      lastName: values.lastName,
      participation: Number(values.participation),
    });
    setValues({ firstName: '', lastName: '', participation: '' });
  }

  // 6. a tela (o "body")
  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={handleChange}
            className={styles.input}
          />
        ))}
        <button type="submit" className={styles.send}>SEND</button>
      </form>
    </header>
  );
}