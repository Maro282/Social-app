import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import * as zod from "zod";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function UpdatePassword({ setUpdatePassword }) {
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const schema = zod.object({
    password: zod.string().nonempty("Password is required"),
    newPassword: zod
      .string()
      .nonempty("New password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,}$/,
        "New password must be at least 8 and contain one lowercase , uppercase , special character and a digit  "
      ),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  function handleChangedPassword(values) {
    setIsLoading(true);
    setErrorMessage("");
    axios
      .patch(
        "https://linked-posts.routemisr.com/users/change-password",
        values,
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((response) => {
        if (response.data.message == "success") {
          toast.success("Password changed successfully!", {
            position: "top-right",
          });
          clear();
        }
      })
      .catch(() => {
        setErrorMessage(" make sure of old password");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function clear() {
    setPassword("");
    setNewPassword("");
    setUpdatePassword(false);
  }

  return (
    <>
      <div className="postEditCard fixed top-1/2 bottom-0 right-0 left-0 bg-white dark:bg-gray-950 rounded-lg shadow-2xl p-5 items-center justify-center z-50 w-[90%] md:w-[50%]  mx-auto h-fit transform -translate-y-1/2  ">
        <div className="w-[90%] sm:w-full mx-auto">
          <form onSubmit={handleSubmit(handleChangedPassword)}>
            <fieldset className="">
              <legend className="mx-auto border-b-1 font-semibold p-2">
                Password Update
              </legend>

              <div className="relative">
                <Input
                  className="w-full mt-3"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="bordered"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  isInvalid={Boolean(errors.password)}
                  errorMessage={errors.password?.message}
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
                  className="w-full mt-3"
                  label="New password"
                  type={showNewPassword ? "text" : "password"}
                  variant="bordered"
                  name="newPassword"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  isInvalid={Boolean(errors.newPassword)}
                  errorMessage={errors.newPassword?.message}
                  {...register("newPassword")}
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

              {errorMessage && (
                <p className="bg-red-500 font-semibold p-3  my-3 text-white w-fit mx-auto rounded-xl  ">
                  {errorMessage}
                </p>
              )}
              <Button
                type="submit"
                variant="flat"
                color="primary"
                className="mt-3 w-full"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Change
              </Button>
            </fieldset>
          </form>
        </div>

        {/* Closing icon for password update */}
        <MdOutlineClose
          type="submit"
          className="absolute top-3 right-3 text-red-800  rounded-full text-xl cursor-pointer"
          onClick={() => {
            setUpdatePassword(false);
          }}
        />
      </div>
    </>
  );
}
