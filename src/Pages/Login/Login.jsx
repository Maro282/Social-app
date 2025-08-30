import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { AuthContext } from "../../Context/AuthContext";

//creating my schema
const schema = zod.object({
  email: zod.string().nonempty("Email is required").email("Email is not valid"),
  password: zod.string().nonempty("password is required"),
});

export default function Login() {
  document.title = "Login";
  const { setUserToken } = useContext(AuthContext);

  //state for api error message
  const [errMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "marwan2025@gmail.com",
      password: "Marwan2020#",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  // function to handle api call
  const handleLogin = (values) => {
    // call api and send data
    setErrorMessage("");
    setIsLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/users/signin", values)
      .then((response) => {
        if (response.data.message == "success") {
          setUserToken(response.data.token);
          sessionStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch(() => {
        setErrorMessage("Incorrect email or password");
        setIsLoading(false);
      });
  };

  return (
    <>
      <main className="outline-1 outline-sky-200 p-5 rounded-2xl shadow-2xl w-[90%] md:w-[60%] mx-auto">
        <h1 className="text-center text-4xl font-semibold my-2 text-sky-700">
          Login & Enjoy . .{" "}
        </h1>

        {errMessage && (
          <p className="rounded-lg bg-red-400 text-white py-2.5 px-1 mt-4">
            {errMessage}
          </p>
        )}

        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            className=" mt-2.5 border-b-2 border-b-sky-200"
            label="Email"
            type="text"
            variant="underlined"
            color="primary"
            name="email"
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email)}
            {...register("email")}
          />

          <Input
            className=" mt-2.5 border-b-2 border-b-sky-200"
            label="Password"
            type="password"
            variant="underlined"
            color="primary"
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password)}
            name="password"
            {...register("password")}
          />

          <Button
            color="primary"
            variant="flat"
            className="my-5 font-semibold"
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Login
          </Button>
        </form>
      </main>
    </>
  );
}
