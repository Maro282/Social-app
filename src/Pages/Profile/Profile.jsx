import profileCover from "./../../assets/profile-cover.jpg";
import placeholder from "./../../assets/placeholder.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { FaEdit } from "react-icons/fa";
import AddEditPost from "../../Components/AddEditPost/AddEditPost";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/PostCard/PostCard";
import { IoIosPersonAdd } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import UpdatePassword from "../../Components/UpdatePassword/UpdatePassword";

export default function Profile() {
  document.title = "Profile";
  const { userToken, userData } = useContext(AuthContext);
  const [img, setImg] = useState(null);
  const [updatePassword, setUpdatePassword] = useState(false);

  //Function to update profile picture
  function handleUploadedImage(e) {
    const formData = new FormData();
    setImg(e.target.files[0]);

    formData.append("photo", img);
    axios
      .put("https://linked-posts.routemisra.com/users/upload-photo", formData, {
        headers: {
          token: userToken,
        },
      })
      .then((response) => {
        if (response.data.message == "success") {
          toast.success("Updated successfully.. ✅", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong .. ❌", {
          position: "top-right",
        });
      });
  }

  //Function to get user posts
  function getUserPosts() {
    return axios.get(
      `https://linked-posts.routemisr.com/users/${userData?._id}/posts`,
      {
        headers: {
          token: userToken,
        },
      }
    );
  }

  // api to get all user posts by tanstak
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
  });

  if (error) {
    return (
      <h1 className="bg-red-500 text-white text-2xl p-8 text-center font-semibold rounded-lg shadow-lg ">
        {error.message}
      </h1>
    );
  }

  return (
    <>
      <main className="w-[90%] mx-auto">
        <div className="flex flex-col gap-4 col-span-1">
          <div className="upper-page rounded-lg bg-gray-100 p-5 dark:bg-transparent">
            <div className="cover-img relative rounded-lg overflow-hidden ">
              <img src={profileCover} alt="cover image" className="w-full" />
            </div>
            <div className=" rounded-full  relative -top-[50px] flex flex-col gap-1 items-center">
              <div className="profile-pic-box size-30 lg:size-36 border-5 border-white relative rounded-full ">
                <img
                  className="size-full object-cover rounded-full "
                  src={userData?.photo}
                  onError={(e) => {
                    e.target.src = placeholder;
                  }}
                />

                <label className=" cursor-pointer ">
                  <FaCamera className="absolute cursor-pointer  bottom-0 right-[2px] text-2xl font-semibold" />
                  <input
                    accept="image/*"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      handleUploadedImage(e);
                    }}
                  />
                </label>
              </div>
              <h1 className="text-2xl font-semibold">{userData?.name}</h1>
              <p className="text-center">
                FrontEnd Developer using modern technologies 💻.
              </p>
              <span className="text-center">Alexandria, Egypt🌊 </span>
            </div>
            <div className="actions flex justify-center  gap-2">
              <Button variant="solid" color="primary">
                <IoIosPersonAdd />
                Connect
              </Button>
              <Button variant="solid" color="primary">
                <AiOutlineMessage />
                Message
              </Button>
            </div>
          </div>

          {/* User data */}
          <div className="data p-5 rounded-lg bg-gray-200  dark:bg-transparent dark:border-1 dark:border-white dark:rounded-xl dark:shadow-sm dark:shadow-sky-500">
            <h2 className="border-b-2 w-fit border-sky-700 pb-1 font-bold text-xl">
              Personal Info . .{" "}
            </h2>

            <ul className="  flex-col md:flex md:flex-row md:flex-wrap ">
              <li className="listItem">
                <p>
                  <span className="font-bold text-lg">Name : </span>
                  {userData?.name}
                </p>
              </li>

              <li className="listItem">
                <p>
                  <span className="font-bold text-lg">Email : </span>
                  {userData?.email}
                </p>
              </li>

              <li className="listItem">
                <p>
                  <span className="font-bold text-lg">Gender : </span>
                  {userData?.gender}
                </p>
              </li>

              <li className="listItem">
                <p>
                  <span className="font-bold text-lg">Birth Date : </span>
                  {userData?.dateOfBirth}
                </p>
              </li>

              <li className="listItem">
                <p>
                  <span className="font-bold text-lg">Password </span>
                </p>
                <FaEdit
                  className="text-sky-600 hover:cursor-pointer transform hover:scale-150 transition-all duration-300"
                  onClick={() => {
                    setUpdatePassword(true);
                  }}
                />
              </li>
            </ul>
          </div>

          {/* Ui for updating password */}
          {updatePassword && (
            <UpdatePassword setUpdatePassword={setUpdatePassword} />
          )}

          <div className="bg-gray-200 p-3 flex  rounded-lg dark:bg-gray-800 w-[90%] mx-auto">
            <AddEditPost getAllPosts={refetch} />
          </div>

          <div className="personal-posts rounded-lg p-5 bg-gray-100 dark:bg-transparent">
            {isLoading ? (
              <div className="flex items-center justify-center  p-5 bg-gray-100 w-full">
                <div className="flex space-x-2 animate-pulse">
                  <div className="size-2 bg-sky-500 rounded-full"></div>
                  <div className="size-2 bg-rose-500 rounded-full"></div>
                  <div className="size-2 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            ) : (
              data?.data?.posts.reverse().map((post) => {
                return (
                  <div key={post._id} className="md:w-[70%] mx-auto">
                    <PostCard
                      post={post}
                      getAllPosts={refetch}
                      from={"profile"}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
}
