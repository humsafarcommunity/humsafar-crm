require('dotenv').config({ path: '.env.local' });
const postgres = require('postgres');

async function test(url, name) {
  console.log(`--- Testing ${name} ---`);
  const sql = postgres(url, { 
    connect_timeout: 10,
    ssl: 'require'
  });
  try {
    const result = await sql`SELECT 1 + 1 AS result`;
    console.log(`${name} Success! Result:`, result[0].result);
    return true;
  } catch (err) {
    console.error(`${name} Failed:`, err.message);
    return false;
  } finally {
    await sql.end();
  }
}

async function run() {
  const pooling = process.env.POSTGRES_URL;
  const direct = process.env.POSTGRES_URL_NON_POOLING;
  
  await test(pooling, "Pooling (6543)");
  await test(direct, "Direct (5432)");
}

run();
