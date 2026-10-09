
// o que o formulário envia (ainda não tem id, porque não foi salvo)
export type NewParticipant = {
  firstName: string;
  lastName: string;
  participation: number;
};

// o participante depois de salvo (o backend gera o id)
export type Participant = NewParticipant & {
  id: number;
};
