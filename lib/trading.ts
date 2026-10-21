export const companies = [
  { id: 'nord', name: 'Nord Systems', ticker: 'NORD', sector: 'სუფთა ენერგია', description: 'ენერგიის ჭკვიანი შენახვა ევროპის უფრო სუფთა ენერგოქსელისთვის.', price: 42.5, change: 8.4, stage: 'C რაუნდი', valuation: '420 მლნ €', location: 'კოპენჰაგენი, დანია', color: '#d7eddf', symbol: 'N', raised: '68 მლნ €', founded: '2019' },
  { id: 'orbit', name: 'Orbit Aerospace', ticker: 'ORBT', sector: 'კოსმოსური ტექნოლოგიები', description: 'დედამიწის დაბალი ორბიტა ხელმისაწვდომი ხდება მომავალი თაობისთვის.', price: 78, change: 12.6, stage: 'D რაუნდი', valuation: '1,2 მლრდ €', location: 'მიუნხენი, გერმანია', color: '#e6e0f7', symbol: 'O', raised: '210 მლნ €', founded: '2017' },
  { id: 'bloom', name: 'Bloom Health', ticker: 'BLMH', sector: 'ციფრული ჯანდაცვა', description: 'ადამიანზე მორგებული, პერსონალიზებული პრევენციული ზრუნვა.', price: 26.8, change: 5.2, stage: 'B რაუნდი', valuation: '185 მლნ €', location: 'ამსტერდამი, ნიდერლანდები', color: '#f7e2da', symbol: 'b', raised: '32 მლნ €', founded: '2021' },
  { id: 'flow', name: 'Flow Financial', ticker: 'FLOW', sector: 'ფინანსური ტექნოლოგიები', description: 'ფინანსური ინსტრუმენტები საზღვრების გარეშე ევროპის მცირე ბიზნესებისთვის.', price: 54.2, change: -2.3, stage: 'C რაუნდი', valuation: '640 მლნ €', location: 'ლონდონი, გაერთიანებული სამეფო', color: '#dce9fa', symbol: 'ƒ', raised: '94 მლნ €', founded: '2018' },
  { id: 'terra', name: 'Terra Foods', ticker: 'TERRA', sector: 'კვების ინოვაციები', description: 'უკეთესი კვების სისტემა მცენარეულ ინოვაციებზე დაყრდნობით.', price: 18.6, change: 6.7, stage: 'B რაუნდი', valuation: '96 მლნ €', location: 'ბარსელონა, ესპანეთი', color: '#eee9cd', symbol: 't', raised: '24 მლნ €', founded: '2020' },
];
export type Transaction = { id: string; companyId: string; side: 'buy' | 'sell'; quantity: number; total: number; date: string };
export type Account = { balance: number; holdings: Record<string, number>; transactions: Transaction[] };
export const initialAccount = (): Account => ({ balance: 10000, holdings: {}, transactions: [] });
export function trade(account: Account, companyId: string, side: 'buy' | 'sell', quantity: number): Account {
  const company = companies.find(c => c.id === companyId);
  if (!company || !Number.isSafeInteger(quantity) || quantity <= 0) throw new Error('მიუთითეთ აქციების დადებითი მთელი რაოდენობა.');
  const total = Math.round(company.price * quantity * 100) / 100;
  if (!Number.isSafeInteger(Math.round(total * 100))) throw new Error('რაოდენობა ზედმეტად დიდია.');
  if (side === 'buy' && total > account.balance) throw new Error('ამ შეკვეთისთვის ვირტუალური თანხა არ გყოფნით.');
  if (side === 'sell' && quantity > (account.holdings[companyId] || 0)) throw new Error('გასაყიდად საკმარისი აქციები არ გაქვთ.');
  return { balance: Math.round((account.balance + (side === 'buy' ? -total : total)) * 100) / 100, holdings: { ...account.holdings, [companyId]: (account.holdings[companyId] || 0) + (side === 'buy' ? quantity : -quantity) }, transactions: [{ id: crypto.randomUUID(), companyId, side, quantity, total, date: new Date().toISOString() }, ...account.transactions] };
}
export function isAccount(value: unknown): value is Account {
  if (!value || typeof value !== 'object') return false;
  const a = value as Account;
  return Number.isFinite(a.balance) && a.balance >= 0 && !!a.holdings && typeof a.holdings === 'object' && Object.entries(a.holdings).every(([id, n]) => companies.some(c => c.id === id) && Number.isSafeInteger(n) && n >= 0) && Array.isArray(a.transactions) && a.transactions.every(t => t && typeof t.id === 'string' && companies.some(c => c.id === t.companyId) && ['buy', 'sell'].includes(t.side) && Number.isSafeInteger(t.quantity) && t.quantity > 0 && Number.isFinite(t.total) && t.total > 0 && Number.isFinite(Date.parse(t.date)));
}
