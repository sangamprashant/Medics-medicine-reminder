// appDataProvider.tsx
import { getRemindersByDate } from "@/utils/db";
import { saveUserName } from "@/utils/storage";
import { useSQLiteContext } from "expo-sqlite";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AppDataContextType = {
    reminderList: RawReminder[],
    todaysLoading: boolean
    fetchReminders: () => void
    handleName: (n: string) => void
    userName: string
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
    const db = useSQLiteContext()
    const [reminderList, setReminderList] = useState<RawReminder[]>([]);
    const [todaysLoading, setTodaysLoading] = useState(true);
    const [userName, setUSerName] = useState<string>("")
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

    const handleName = async (n: string) => {
        setUSerName(n)
        await saveUserName(n)
    }

    return (
        <AppDataContext.Provider value={{ reminderList, todaysLoading, fetchReminders, handleName, userName }}>
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
