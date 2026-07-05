export function formatDate(isoDate) {
  if (!isoDate) return '';
  const parts = String(isoDate).split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year}/${month}/${day}`;
  }
  return isoDate;
}

export function formatProfit(amount) {
  const number = Number(amount);
  if (Number.isNaN(number)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}
