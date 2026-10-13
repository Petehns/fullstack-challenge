import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ParticipantsTable } from './ParticipantsTable';

const participants = [
  { id: 1, firstName: 'Carlos', lastName: 'Moura', participation: 5 },
  { id: 2, firstName: 'Fernanda', lastName: 'Oliveira', participation: 15 },
];

describe('ParticipantsTable', () => {
  it('mostra uma linha por participante, com a participação em %', () => {
    render(<ParticipantsTable participants={participants} onDelete={vi.fn()} />);

    expect(screen.getByText('Carlos')).toBeInTheDocument();
    expect(screen.getByText('Oliveira')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  it('chama onDelete com o id ao clicar na lixeira', async () => {
    const onDelete = vi.fn();
    render(<ParticipantsTable participants={participants} onDelete={onDelete} />);

    await userEvent.click(screen.getByRole('button', { name: 'Remover Fernanda Oliveira' }));

    expect(onDelete).toHaveBeenCalledWith(2);
  });
});
