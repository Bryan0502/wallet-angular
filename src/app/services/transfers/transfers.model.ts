
export interface Transfer {
    key: string | null; 
    accountIdDestination: string;
    accountIdDestinationName: string;
    accountIdOrigin: string;
    accountIdOriginName: string;
    ammount: number;
    date: string;
    userId: string;
  }