import { PieChart, Pie } from 'recharts';
import type { NewParticipant } from '../types';
import styles from './ParticipationChart.module.css';


const COLORS = ['#2f8fd8', '#1abc9c', '#9b59b6', '#bdc3c7', '#e74c3c'];


const EMPTY_COLOR = '#d3d3d3';

type Props = {
  participants: NewParticipant[];
};


type Slice = {
  name: string;
  value: number;
  fill: string;
};

export function ParticipationChart({ participants }: Props) {
  let data: Slice[];

  if (participants.length === 0) {
    
    data = [{ name: 'Sem dados', value: 1, fill: EMPTY_COLOR }];
  } else {
    
    data = participants.map((participant, index) => ({
      name: `${participant.firstName} ${participant.lastName}`,
      value: participant.participation,
      fill: COLORS[index % COLORS.length],
    }));
  }

  return (
    <div className={styles.container}>
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={115}
          stroke="white"
          strokeWidth={3}
          isAnimationActive={false}
        />
      </PieChart>

      <ul className={styles.legend}>
        {data.map((item) => (
          <li key={item.name} className={styles.legendItem} style={{ color: item.fill }}>
            <span className={styles.swatch} style={{ background: item.fill }} />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
