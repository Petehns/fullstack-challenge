
export type NewParticipant = {
  firstName: string;
  lastName: string;
  participation: number;
};

export type Participant = NewParticipant & {
  id: number;
};
