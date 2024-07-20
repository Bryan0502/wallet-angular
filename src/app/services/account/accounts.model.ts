// src/app/models/account.model.ts
export interface Account {
    key: string | null; // Opcional porque solo se usa después de obtener los datos de Firebase
    accountBalance: number;
    accountName: string;
    accountNumber: number;
    userId: string;
  }