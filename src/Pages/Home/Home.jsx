import { useContext } from "react";
import { CounterContext } from "./../../Context/CounterContext";
import { AuthContext } from "../../Context/AuthContext";

// import styles from "./Home.module.css";
export default function Home() {
  const { counter, setCounter } = useContext(CounterContext);

  return (
    <div className="relative">
      <p className=" bg-red-500 text-white mb-2">
        <span>{counter}</span>
      </p>
      <button
        className="bg-amber-300 text-black rounded-lg px-3 py-2.5"
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increase
      </button>
    </div>
  );
}
