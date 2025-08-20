export type ColumnType = 'text' | 'date' | 'currency' | 'chip';

export interface ColumnDef {
  key: string;               // ID único de la columna (matColumnDef)
  header: string;            // texto del encabezado
  type?: ColumnType;         // cómo renderizar
  dateFormat?: string;       // para 'date' (opcional)
  currencyCode?: string;     // para 'currency' (ej. 'COP')
  currencyDisplay?: 'symbol' | 'code' | 'symbol-narrow'; // opcional
  // Si más adelante quieres reutilizar el mismo campo en varias columnas:
  // field?: string; // propiedad real del row a mostrar (si no se usa, toma 'key')
}
