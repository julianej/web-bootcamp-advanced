export type Genre =
  | 'rock'
  | 'jazz'
  | 'classical'
  | 'electronic'
  | 'pop';

// Defines the concert data structure 
export type Concert = {
  id: string;
  title: string;
  artist: string;
  venue: string;
  date: Date;
  ticketPrice: number;
  genre: Genre;
};