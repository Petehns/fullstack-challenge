import { useState } from 'react';
import type { NewParticipant } from '../types';
import styles from './ParticipantForm.module.css';

const fields = [
  { name: 'firstName', placeholder: 'First name' },
  { name: 'lastName', placeholder: 'Last name' },
  { name: 'participation', placeholder: 'Participation' },
] as const;

type Props = {
  onAdd: (participant: NewParticipant) => void;
   erro: string;
};

export function ParticipantForm({ onAdd, erro }: Props) {
  const [values, setValues] = useState({ firstName: '', lastName: '', participation: '' });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
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
            required
          />
        ))}
        <button type="submit" className={styles.send}>SEND</button>
      </form>
        {erro && <p className={styles.erro}>{erro}</p>}
    </header>
  );
}