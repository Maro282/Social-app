import { createContext, useState } from "react";

const CounterContext = createContext();

export default function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  );
}

export { CounterContext };
