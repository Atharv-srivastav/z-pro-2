import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolioData } from '../src/data/portfolioData.js';

test('portfolio data has required top-level sections', () => {
  assert.ok(portfolioData.personal);
  assert.ok(Array.isArray(portfolioData.education));
  assert.ok(Array.isArray(portfolioData.skills));
  assert.ok(Array.isArray(portfolioData.projects));
  assert.ok(Array.isArray(portfolioData.certifications));
});

test('portfolio personal section includes core identity fields', () => {
  assert.equal(typeof portfolioData.personal.fullName, 'string');
  assert.ok(portfolioData.personal.fullName.length > 0);
  assert.equal(typeof portfolioData.personal.email, 'string');
  assert.ok(portfolioData.personal.email.includes('@'));
});

