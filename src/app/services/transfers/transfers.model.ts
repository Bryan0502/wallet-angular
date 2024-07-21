
export interface Transfer {
    key: string | null; 
    accountIdDestination: string;
    accountIdOrigin: string;
    ammount: number;
    date: string;
    userId: string;
  }