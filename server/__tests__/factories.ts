import { createConnection, getConnection } from 'typeorm';

// CONNECTION DATA BASE

export async function createConnectionAndRunMigrations(): Promise<void> {
  const connection = await createConnection();
  await connection.runMigrations();
}

export async function dropTableAndCloseConnection(): Promise<void> {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.close();
}
