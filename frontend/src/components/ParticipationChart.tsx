// components/ParticipationChart.tsx

import { PieChart, Pie } from 'recharts';
import type { NewParticipant } from '../types';
import styles from './ParticipationChart.module.css';

// uma cor por participante; se tiver mais gente que cor, volta pro começo da lista
const COLORS = ['#2f8fd8', '#1abc9c', '#9b59b6', '#bdc3c7', '#e74c3c'];

// cor da fatia "Sem dados"
const EMPTY_COLOR = '#d3d3d3';

type Props = {
  participants: NewParticipant[];
};

// o formato que o <Pie> entende:
// name = rótulo, value = tamanho da fatia, fill = cor da fatia
type Slice = {
  name: string;
  value: number;
  fill: string;
};

export function ParticipationChart({ participants }: Props) {
  let data: Slice[];

  if (participants.length === 0) {
    // lista vazia: uma fatia cinza só, ocupando o círculo inteiro
    data = [{ name: 'Sem dados', value: 1, fill: EMPTY_COLOR }];
  } else {
    // transforma cada participante numa fatia
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
          dataKey="value"       // qual campo define o tamanho da fatia
          innerRadius={60}      // o buraco do meio (vira rosca)
          outerRadius={115}
          stroke="white"        // borda branca = o espacinho entre as fatias
          strokeWidth={3}
          isAnimationActive={false}
        />
      </PieChart>

      {/* legenda feita à mão: mesma lista, mesmas cores */}
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
