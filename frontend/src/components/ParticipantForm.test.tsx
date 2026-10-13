import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ParticipantForm } from './ParticipantForm';

describe('ParticipantForm', () => {
  it('envia o participante com a participação convertida para número', async () => {
    const onAdd = vi.fn();
    render(<ParticipantForm onAdd={onAdd} erro="" setErro={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('First name'), 'Carlos');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Moura');
    await userEvent.type(screen.getByPlaceholderText('Participation'), '5');
    await userEvent.click(screen.getByRole('button', { name: 'SEND' }));

    expect(onAdd).toHaveBeenCalledWith({ firstName: 'Carlos', lastName: 'Moura', participation: 5 });
  });

  it('limpa os campos depois de enviar', async () => {
    render(<ParticipantForm onAdd={vi.fn()} erro="" setErro={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('First name'), 'Carlos');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Moura');
    await userEvent.type(screen.getByPlaceholderText('Participation'), '5');
    await userEvent.click(screen.getByRole('button', { name: 'SEND' }));

    expect(screen.getByPlaceholderText('First name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Participation')).toHaveValue('');
  });

  it('não envia se algum campo estiver vazio', async () => {
    const onAdd = vi.fn();
    render(<ParticipantForm onAdd={onAdd} erro="" setErro={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('First name'), 'Carlos');
    await userEvent.click(screen.getByRole('button', { name: 'SEND' }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('mostra o erro recebido e limpa ao clicar no X', async () => {
    const setErro = vi.fn();
    render(<ParticipantForm onAdd={vi.fn()} erro="Participação acima de 100%" setErro={setErro} />);

    expect(screen.getByText('Participação acima de 100%')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '×' }));

    expect(setErro).toHaveBeenCalledWith('');
  });

  it('não mostra o balão quando não há erro', () => {
    render(<ParticipantForm onAdd={vi.fn()} erro="" setErro={vi.fn()} />);

    expect(screen.queryByRole('button', { name: '×' })).not.toBeInTheDocument();
  });
});
