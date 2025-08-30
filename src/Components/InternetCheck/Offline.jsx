import React, { useEffect, useState } from "react";

export default function Offline({ isOffline }) {
  const [showOffineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setShowOfflineMessage(true);
    }
    const x = setTimeout(() => {
      setShowOfflineMessage(false);
    }, 3000);

    return () => clearTimeout(x);
  }, [isOffline]);

  return (
    <div
      className={`bg-red-500 text-white font-semibold text-center py-2 px-4 absolute right-2 bottom-3.5 rounded-lg shadow-2xl shadow-red-400  transition-all duration-300 ${
        showOffineMessage ? "opacity-100 " : "opacity-0"
      } `}
    >
      <p>You are offline now</p>
    </div>
  );
}
