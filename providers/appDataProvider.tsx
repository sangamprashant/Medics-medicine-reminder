// appDataProvider.tsx
import { getRemindersByDate } from "@/utils/db";
import { useSQLiteContext } from "expo-sqlite";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AppDataContextType = {
    reminderList: RawReminder[]
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
    const db = useSQLiteContext()
    const [reminderList, setReminderList] = useState<RawReminder[]>([]);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const reminders: RawReminder[] = await getRemindersByDate(db, new Date());
                console.log("Fetched reminders:", reminders);
                setReminderList(reminders);
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        };

        fetchReminders();
    }, [db]);

    return (
        <AppDataContext.Provider value={{ reminderList }}>
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error("useAppData must be used within an AppDataProvider");
    }
    return context;
};
