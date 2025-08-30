import { Button } from "@heroui/react";
import notFound from "./../../assets/404-error.jpg";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found 404";
  }, []);
  return (
    <div>
      <div className="not-found-img-box">
        <img
          src={notFound}
          alt="not found page error 404 "
          className="w-full"
        />
      </div>
    </div>
  );
}
