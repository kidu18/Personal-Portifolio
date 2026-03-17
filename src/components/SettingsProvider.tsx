"use client";

import React, { createContext, useContext } from "react";
import { Settings } from "@/types";

const SettingsContext = createContext<Settings | null>(null);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};

export const SettingsProvider = ({
    settings,
    children,
}: {
    settings: Settings | null;
    children: React.ReactNode;
}) => {
    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};
