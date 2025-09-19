// Medicine types
type MedicineType =
  | "tablet"
  | "ml"
  | "syrup"
  | "injection"
  | "cream";

// Medicine interface
type Medicine = {
  id: number;
  name: string;
  type: MedicineType;
};

interface Reminder {
  id?: number; // auto update
  date: Date;
  medicine: number; // medicine id
  dose: string;
  frequency: string;
  consume: "Before meal" | "After meal";
  done?: 0 | 1; // default false
}


// Raw data type from SQLite
interface RawReminder {
  id: number;
  date: string;                // ISO string from SQLite
  medicine: number;            // medicine id
  medicineName: string;        // joined from medicines table
  medicineType: MedicineType;        // joined from medicines table
  dose: string;
  frequency: string;
  consume: "Before meal" | "After meal";
  done: 0 | 1;                 // SQLite stores as integer
}