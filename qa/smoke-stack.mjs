#!/usr/bin/env node

const apiBase = process.env.QA_API_BASE_URL ?? 'http://localhost:3000/v1';
const webBase = process.env.QA_WEB_BASE_URL ?? 'http://localhost:3001';

const checks = [
  {
    name: 'API liveness',
    url: `${apiBase}/health/live`,
    validate: (body) => body?.status === 'ok',
  },
  {
    name: 'API readiness',
    url: `${apiBase}/health/ready`,
    validate: (body) =>
      body?.status === 'ready' &&
      body?.checks?.redis?.status === 'ok' &&
      body?.checks?.database?.status === 'ok',
  },
  {
    name: 'Web portal',
    url: webBase,
    validate: (_, status) => status === 200,
  },
];

async function runCheck(check) {
  const response = await fetch(check.url);
  const body = check.url.includes('/health/')
    ? await response.json().catch(() => null)
    : null;

  const passed = check.validate(body, response.status);
  return {
    name: check.name,
    url: check.url,
    status: response.status,
    passed,
  };
}

async function main() {
  console.log('[qa-smoke] Running FleetFlow stack smoke checks...');

  const results = [];
  for (const check of checks) {
  try {
      const result = await runCheck(check);
      results.push(result);
      const label = result.passed ? 'PASS' : 'FAIL';
      console.log(`[qa-smoke] ${label} ${result.name} (${result.status})`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      results.push({ name: check.name, url: check.url, status: 0, passed: false });
      console.log(`[qa-smoke] FAIL ${check.name} (${message})`);
    }
  }

  const failed = results.filter((result) => !result.passed);
  if (failed.length > 0) {
    console.error(`[qa-smoke] ${failed.length} check(s) failed.`);
    process.exit(1);
  }

  console.log('[qa-smoke] All checks passed.');
}

main();
