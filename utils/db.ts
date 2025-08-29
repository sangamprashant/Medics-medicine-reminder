import { commonMedicines } from "@/initial/medicine-init";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = result?.user_version || 0;

  if (currentDbVersion >= DATABASE_VERSION) return;

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS medicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,                 -- store ISO string for Date
        medicine INTEGER NOT NULL,          -- FK to medicines.id
        dose TEXT NOT NULL,
        frequency TEXT NOT NULL,
        consume TEXT CHECK(consume IN ('Before meal','After meal')) NOT NULL,
        done INTEGER DEFAULT 0,             -- 0 = false, 1 = true
        FOREIGN KEY (medicine) REFERENCES medicines(id)
      );
    `);

    // Insert default medicines
    for (const med of commonMedicines) {
      await db.runAsync(
        "INSERT INTO medicines (name, type) VALUES ( ?, ?)",
        med.name,
        med.type
      );
    }

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function resetDatabase(db: SQLiteDatabase) {
  // Drop all existing tables
  await db.execAsync(`
    DROP TABLE IF EXISTS reminders;
    DROP TABLE IF EXISTS medicines;
  `);

  // Recreate tables
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';

    CREATE TABLE IF NOT EXISTS medicines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      medicine INTEGER NOT NULL,
      dose TEXT NOT NULL,
      frequency TEXT NOT NULL,
      consume TEXT CHECK(consume IN ('Before meal','After meal')) NOT NULL,
      done INTEGER DEFAULT 0,
      FOREIGN KEY (medicine) REFERENCES medicines(id)
    );
  `);

  // Insert default medicines if needed
  for (const med of commonMedicines) {
    await db.runAsync(
      "INSERT INTO medicines (name, type) VALUES (?, ?)",
      med.name,
      med.type
    );
  }

  // Reset DB version
  await db.execAsync(`PRAGMA user_version = 1`);
  console.log("✅ Database has been reset and tables recreated.");
}

export async function addMedicine(
  db: SQLiteDatabase,
  name: string,
  type: string
) {
  await db.runAsync(
    "INSERT INTO medicines (name, type) VALUES (?, ?)",
    name,
    type
  );
}

export async function getAllMedicines(db: SQLiteDatabase) {
  return db.getAllAsync<Medicine>("SELECT * FROM medicines");
}

export async function getMedicinesByType(
  db: SQLiteDatabase,
  type: MedicineType
) {
  return db.getAllAsync<Medicine>(
    "SELECT * FROM medicines WHERE type = ?",
    type
  );
}

export async function addReminder(db: SQLiteDatabase, data: Reminder) {
  await db.runAsync(
    `INSERT INTO reminders (date, medicine, dose, frequency, consume)
     VALUES (?, ?, ?, ?, ?)`,
    data.date.toISOString(),
    data.medicine,
    data.dose,
    data.frequency,
    data.consume
  );
}

export async function addReminderList(db: SQLiteDatabase, data: Reminder[]) {
  const insertStmt = await db.prepareAsync(
    `INSERT INTO reminders (date, medicine, dose, frequency, consume)
     VALUES (?, ?, ?, ?, ?)`
  );

  try {
    await db.execAsync("BEGIN TRANSACTION");

    for (const item of data) {
      await insertStmt.executeAsync([
        item.date.toISOString(),
        item.medicine,
        item.dose,
        item.frequency,
        item.consume,
      ]);
    }

    await db.execAsync("COMMIT");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    throw error;
  } finally {
    await insertStmt.finalizeAsync();
  }
}

export async function getAllReminders(db: SQLiteDatabase) {
  return db.getAllAsync<Reminder>(`
    SELECT r.*, m.name as medicineName, m.type as medicineType
    FROM reminders r
    LEFT JOIN medicines m ON r.medicine = m.id
  `);
}

export async function getRemindersByDate(db: SQLiteDatabase, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return db.getAllAsync<RawReminder>(
    `
    SELECT r.*, m.name as medicineName, m.type as medicineType
    FROM reminders r
    LEFT JOIN medicines m ON r.medicine = m.id
    WHERE r.date BETWEEN ? AND ?
  `,
    startOfDay.toISOString(),
    endOfDay.toISOString()
  );
}

export async function updateReminderStatus(
  db: SQLiteDatabase,
  id: number,
  done: boolean
) {
  await db.runAsync(
    "UPDATE reminders SET done = ? WHERE id = ?",
    done ? 1 : 0,
    id
  );
}
