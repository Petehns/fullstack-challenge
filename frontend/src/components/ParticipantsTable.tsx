
import type { NewParticipant } from '../types';
import styles from './ParticipantsTable.module.css';

type Props = {
  participants: NewParticipant[];
};

export function ParticipantsTable({ participants }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>First name</th>
          <th>Last name</th>
          <th>Participation</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((participant, index) => ( /*index tipo foreach que passa por todo index de participantes */
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{participant.firstName}</td>
            <td>{participant.lastName}</td>
            <td>{participant.participation}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
