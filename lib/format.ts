/** Georgian EUR notation, independent of browser ICU locale availability. */
export function formatEuro(value: number): string {
  const [whole, fraction] = value.toFixed(2).split('.');
  return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')},${fraction}\u00a0€`;
}

export function formatDate(value: string): string {
  const date = new Date(value);
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}
