import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, vi } from 'vitest';
import App from './App';

function respostaJson(corpo: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify(corpo), { status }));
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('App', () => {
  it('carrega e mostra os participantes do backend', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      respostaJson([{ id: 1, firstName: 'Carlos', lastName: 'Moura', participation: 5 }])
    ));

    render(<App />);

    expect(await screen.findByText('Carlos')).toBeInTheDocument();
  });

  it('mostra a mensagem de erro da API quando o cadastro é recusado', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn((_url: string, opcoes?: RequestInit) =>
      opcoes?.method === 'POST'
        ? respostaJson({ participation: ['Total participation cannot exceed 100%.'] }, 400)
        : respostaJson([])
    ));

    render(<App />);

    await userEvent.type(screen.getByPlaceholderText('First name'), 'Ana');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Silva');
    await userEvent.type(screen.getByPlaceholderText('Participation'), '50');
    await userEvent.click(screen.getByRole('button', { name: 'SEND' }));

    expect(await screen.findByText('Total participation cannot exceed 100%.')).toBeInTheDocument();
  });

  it('avisa quando não consegue conectar ao servidor', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))));

    render(<App />);

    expect(await screen.findByText('Não foi possível conectar ao servidor.')).toBeInTheDocument();
  });
});
