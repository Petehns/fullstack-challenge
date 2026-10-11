
import type { Participant } from '../types';
import styles from './ParticipantsTable.module.css';

type Props = {
  participants: Participant[];
  onDelete: (id: number) => void;
};

export function ParticipantsTable({ participants, onDelete }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>First name</th>
          <th>Last name</th>
          <th>Participation</th>
          <th className={styles.actions}></th>{/* coluna extra da lixeira, sem bordas */}
        </tr>
      </thead>
      <tbody>
        {participants.map((participant, index) => ( /*index tipo foreach que passa por todo index de participantes */
          <tr key={participant.id}>
            <td>{index + 1}</td>
            <td>{participant.firstName}</td>
            <td>{participant.lastName}</td>
            <td>{participant.participation}%</td>
            <td className={styles.actions}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => onDelete(participant.id)}
                aria-label={`Remover ${participant.firstName} ${participant.lastName}`}
              >
                {/* ícone de lixeira desenhado em SVG (tipo um SF Symbol, só que inline) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
