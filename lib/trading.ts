export const companies = [
  { id: 'nord', name: 'Nord Systems', ticker: 'NORD', sector: 'Clean energy', description: 'Smarter energy storage for a cleaner European grid.', price: 42.5, change: 8.4, stage: 'Series C', valuation: '€420M', location: 'Copenhagen, DK', color: '#d7eddf', symbol: 'N', raised: '€68M', founded: '2019' },
  { id: 'orbit', name: 'Orbit Aerospace', ticker: 'ORBT', sector: 'Space technology', description: 'Making low-earth orbit accessible to the next generation.', price: 78, change: 12.6, stage: 'Series D', valuation: '€1.2B', location: 'Munich, DE', color: '#e6e0f7', symbol: 'O', raised: '€210M', founded: '2017' },
  { id: 'bloom', name: 'Bloom Health', ticker: 'BLMH', sector: 'Digital health', description: 'Personalised preventative care, built around people.', price: 26.8, change: 5.2, stage: 'Series B', valuation: '€185M', location: 'Amsterdam, NL', color: '#f7e2da', symbol: 'b', raised: '€32M', founded: '2021' },
  { id: 'flow', name: 'Flow Financial', ticker: 'FLOW', sector: 'Fintech', description: 'Borderless financial tools for Europe’s small businesses.', price: 54.2, change: -2.3, stage: 'Series C', valuation: '€640M', location: 'London, UK', color: '#dce9fa', symbol: 'ƒ', raised: '€94M', founded: '2018' },
  { id: 'terra', name: 'Terra Foods', ticker: 'TERRA', sector: 'Food innovation', description: 'A better food system, rooted in plant-based innovation.', price: 18.6, change: 6.7, stage: 'Series B', valuation: '€96M', location: 'Barcelona, ES', color: '#eee9cd', symbol: 't', raised: '€24M', founded: '2020' },
];
export type Transaction = { id: string; companyId: string; side: 'buy' | 'sell'; quantity: number; total: number; date: string };
export type Account = { balance: number; holdings: Record<string, number>; transactions: Transaction[] };
export const initialAccount = (): Account => ({ balance: 10000, holdings: {}, transactions: [] });
export function trade(account: Account, companyId: string, side: 'buy' | 'sell', quantity: number): Account {
  const company = companies.find(c => c.id === companyId);
  if (!company || !Number.isSafeInteger(quantity) || quantity <= 0) throw new Error('Enter a positive whole number of shares.');
  const total = Math.round(company.price * quantity * 100) / 100;
  if (!Number.isSafeInteger(Math.round(total * 100))) throw new Error('Quantity is too large.');
  if (side === 'buy' && total > account.balance) throw new Error('Not enough virtual cash for this order.');
  if (side === 'sell' && quantity > (account.holdings[companyId] || 0)) throw new Error('You don’t own enough shares to sell.');
  return { balance: Math.round((account.balance + (side === 'buy' ? -total : total)) * 100) / 100, holdings: { ...account.holdings, [companyId]: (account.holdings[companyId] || 0) + (side === 'buy' ? quantity : -quantity) }, transactions: [{ id: crypto.randomUUID(), companyId, side, quantity, total, date: new Date().toISOString() }, ...account.transactions] };
}
export function isAccount(value: unknown): value is Account {
  if (!value || typeof value !== 'object') return false;
  const a = value as Account;
  return Number.isFinite(a.balance) && a.balance >= 0 && !!a.holdings && typeof a.holdings === 'object' && Object.entries(a.holdings).every(([id, n]) => companies.some(c => c.id === id) && Number.isSafeInteger(n) && n >= 0) && Array.isArray(a.transactions) && a.transactions.every(t => t && typeof t.id === 'string' && companies.some(c => c.id === t.companyId) && ['buy', 'sell'].includes(t.side) && Number.isSafeInteger(t.quantity) && t.quantity > 0 && Number.isFinite(t.total) && t.total > 0 && Number.isFinite(Date.parse(t.date)));
}
