"use client";

import { createContext, useContext } from "react";

type ProtocolLockContextType = {
    isLocked: boolean;
};

const ProtocolLockContext = createContext<ProtocolLockContextType>({
    isLocked: false,
});

export const useProtocolLock = () => useContext(ProtocolLockContext);

export const ProtocolLockProvider = ({
    children,
    isLocked,
}: {
    children: React.ReactNode;
    isLocked: boolean;
}) => {
    return (
        <ProtocolLockContext.Provider value={{ isLocked }}>
            {children}
        </ProtocolLockContext.Provider>
    );
};
