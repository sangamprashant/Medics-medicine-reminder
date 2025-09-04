// appDataProvider.tsx
import { getRemindersByDate } from "@/utils/db";
import { useSQLiteContext } from "expo-sqlite";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AppDataContextType = {
    reminderList: RawReminder[],
    todaysLoading: boolean
    fetchReminders: () => void
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
    const db = useSQLiteContext()
    const [reminderList, setReminderList] = useState<RawReminder[]>([]);
    const [todaysLoading, setTodaysLoading] = useState(true);

    let today = new Date();
    const fetchReminders = async () => {
        try {
            setTodaysLoading(true)
            const reminders: RawReminder[] = await getRemindersByDate(db, today);
            setReminderList(reminders);
        } catch (error) {
            console.error("Error fetching reminders:", error);
        } finally {
            setTodaysLoading(false)
        }
    };

    useEffect(() => {
        fetchReminders();
    }, [db]);

    return (
        <AppDataContext.Provider value={{ reminderList, todaysLoading, fetchReminders }}>
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
