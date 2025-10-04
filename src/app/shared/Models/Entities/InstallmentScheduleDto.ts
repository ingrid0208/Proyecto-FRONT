export interface InstallmentScheduleDto {
  number: number;          // Número de la cuota
  paymentDate: string;     // Fecha de pago en ISO string
  amount: number;          // Valor de la cuota
  remainingBalance: number;// Saldo después del pago
}
