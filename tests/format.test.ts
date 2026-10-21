import test from 'node:test';
import assert from 'node:assert/strict';
import { formatEuro, formatDate } from '../lib/format';

test('Georgian euro formatting preserves cents, grouping and currency position', () => {
  assert.equal(formatEuro(10000), '10\u00a0000,00\u00a0€');
  assert.equal(formatEuro(42.5), '42,50\u00a0€');
  assert.equal(formatEuro(0), '0,00\u00a0€');
  assert.equal(formatEuro(9919.6), '9\u00a0919,60\u00a0€');
});
test('transaction dates use Georgian day-month-year order', () => {
  assert.equal(formatDate(new Date(2026, 9, 21, 12).toISOString()), '21.10.2026');
});
