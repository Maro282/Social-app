import { useEffect, useState } from "react";

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);

  //Function to check weather the browser is offline or not
  function checkOffline() {
    window.addEventListener("offline", () => {
      setIsOffline(true);
    });
    window.addEventListener("online", () => {
      setIsOffline(false);
    });
  }

  useEffect(() => {
    checkOffline();
  }, []);

  return { isOffline };
}
