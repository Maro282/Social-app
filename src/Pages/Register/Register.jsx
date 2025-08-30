import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

//creating my schema

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Minimum length is 3"),
    email: zod
      .string()
      .nonempty("Email is required")
      .email("Email is not valid"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,}$/,
        "password must be at least 8 and contain one lowercase , uppercase , special character and a digit  "
      ),
    rePassword: zod.string().nonempty("Repassword is required"),
    dateOfBirth: zod.coerce
      .date()
      .refine(
        (date) => {
          if (new Date().getFullYear() - date.getFullYear() < 18) {
            return false;
          } else {
            return true;
          }
        },
        {
          message: "you are young",
          path: ["dateOfBirth"],
        }
      )
      .transform((value) => {
        return `${value.getFullYear()}-${
          value.getMonth() + 1
        }-${value.getDay()}`;
      }),
    gender: zod.enum(["male", "female"]),
  })
  .refine(
    (value) => {
      if (value.password != value.rePassword) {
        return false;
      } else {
        return true;
      }
    },
    {
      message: "Not Match",
      path: ["rePassword"],
    }
  );

export default function Register() {
  document.title = "Register";
  //state for api error message
  const [errMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  // function to handle api call
  const handleRegister = (values) => {
    // call api and send data
    setErrorMessage("");
    setIsLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/users/signup", values)
      .then((response) => {
        if (response.data.message == "success") navigate("/login");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <main className="outline-1 outline-sky-200 p-5 rounded-2xl shadow-2xl w-[90%] md:w-[60%] mx-auto">
        <h1 className="text-center text-4xl font-semibold my-2 text-sky-700">
          Join Us . .{" "}
        </h1>

        {errMessage && (
          <p className="rounded-lg bg-red-400 text-white py-2.5 px-1">
            {errMessage}
          </p>
        )}

        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Input
            className=" mt-2.5 border-b-2 border-b-sky-200"
            label="Name"
            type="text"
            variant="underlined"
            color="primary"
            name="name"
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name)}
            //   {...register("name", {
            //     required: "Name Is Required",
            //   })
            // }

            //by using zod
            {...register("name")}
          />

          <Input
            className=" mt-2.5 border-b-2 border-b-sky-200"
            label="Email"
            type="text"
            variant="underlined"
            color="primary"
            name="email"
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email)}
            // {...register("email", {
            //   required: "Email Is Required",
            //   pattern: {
            //     value: /^[a-zA-Z]+@gmail.com$/,
            //     message: "Email Is Not Valid",
            //   },
            // })}

            //by using zod
            {...register("email")}
          />

          <div className="relative">
            <Input
              className=" mt-2.5 border-b-2 border-b-sky-200"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="underlined"
              color="primary"
              errorMessage={errors.password?.message}
              isInvalid={Boolean(errors.password)}
              name="password"
              // {...register("password", {
              //   required: "Password Is Required",
              // })}

              //by zod
              {...register("password")}
            />

            {showPassword ? (
              <FaEyeSlash
                className=" absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50"
                onClick={() => {
                  setShowPassword(false);
                }}
              />
            ) : (
              <FaRegEye
                className=" absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50"
                onClick={() => {
                  setShowPassword(true);
                }}
              />
            )}
          </div>

          <div className="relative">
            <Input
              className=" mt-2.5 border-b-2 border-b-sky-200"
              label="Re-Password"
              type={showNewPassword ? "text" : "password"}
              variant="underlined"
              color="primary"
              name="rePassword"
              errorMessage={errors.rePassword?.message}
              isInvalid={Boolean(errors.rePassword)}
              // {...register("rePassword", {
              //   required: "Re-Password Is Required",
              //   validate: (value) => {
              //     if (watch("password") != value) {
              //       return "Not Match";
              //     }
              //   },
              // })}

              // by zod
              {...register("rePassword")}
            />

            {showNewPassword ? (
              <FaEyeSlash
                className=" absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50"
                onClick={() => {
                  setShowNewPassword(false);
                }}
              />
            ) : (
              <FaRegEye
                className=" absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50"
                onClick={() => {
                  setShowNewPassword(true);
                }}
              />
            )}
          </div>

          <Input
            className=" mt-2.5 border-b-2 border-b-sky-200"
            label="Date Of Birth"
            type="date"
            variant="underlined"
            color="primary"
            name="dateOfBirth"
            errorMessage={errors.dateOfBirth?.dateOfBirth?.message}
            isInvalid={Boolean(errors.dateOfBirth)}
            {...register("dateOfBirth")}
          />

          <Select
            className="mt-2.5 border-b-2 border-b-sky-200"
            label="Select Gender"
            variant="underlined"
            name="gender"
            errorMessage={errors.gender?.message}
            isInvalid={Boolean(errors.gender)}
            // {...register("gender", {
            //   required: "Gender is Required",
            // })}

            //by zod
            {...register("gender")}
          >
            <SelectItem key={"male"}>Male</SelectItem>
            <SelectItem key={"female"}>Female</SelectItem>
          </Select>

          <Button
            color="primary"
            variant="flat"
            className="my-5 font-semibold"
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Register
          </Button>
        </form>
      </main>
    </>
  );
}
