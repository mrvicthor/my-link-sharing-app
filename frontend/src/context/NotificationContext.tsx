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
    navigator.clipboard
      .writeText(window.location.href)
      .catch((err) => console.log("Failed to copy URL: ", err));
    const timeout = setTimeout(() => setNotification(false), 3000);
    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
