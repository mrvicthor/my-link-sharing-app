import React, { createContext, useEffect, useState } from "react";

type NotificationContextType = {
  notification: boolean;
  setNotification: (value: boolean) => void;
};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    navigator.clipboard.writeText(window.location.href);
    const interval = setTimeout(() => setNotification(false), 3000);
    return () => clearTimeout(interval);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
