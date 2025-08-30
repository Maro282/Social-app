import React, { useEffect, useState } from "react";

export default function Online({ isOffline }) {
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    if (isOffline == false) setShowOnlineMessage(true);
    const x = setTimeout(() => {
      setShowOnlineMessage(false);
    }, 3000);

    return () => clearTimeout(x);
  }, [isOffline]);

  return (
    <div
      className={`bg-green-500 text-white font-semibold text-center py-2 px-4 absolute right-2 bottom-3.5 rounded-lg shadow-2xl shadow-red-400  transition-all duration-300 ${
        showOnlineMessage ? "opacity-100 " : "opacity-0"
      } `}
    >
      <p> Online</p>
    </div>
  );
}
