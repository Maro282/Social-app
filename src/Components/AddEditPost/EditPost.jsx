import React from "react";
import { useContext, useState } from "react";
import { Textarea } from "@heroui/react";
import { Button } from "@heroui/react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function EditPost({
  getAllPosts,
  showPostEdit,
  setShowPostEdit,
  post,
  setShowOptions,
}) {
  const { userToken } = useContext(AuthContext);
  const [body, setBody] = useState(post.body);
  const [img, setImg] = useState("");

  // function to update post
  function updatePost() {
    const formData = new FormData();
    body && formData.append("body", body);
    img && formData.append("image", img);

    toast.promise(
      axios
        .put("https://linked-posts.routemisr.com/posts/" + post._id, formData, {
          headers: {
            token: userToken,
          },
        })
        .then((response) => {
          if (response.data.message == "success") {
            {
              getAllPosts();
            }

            clear();
          }
        })
        .catch((err) => {
          console.log(err);
        }),
      {
        loading: "Posting ...",
        success: "Updated successfully!",
        error: "Can not update",
      }
    );
  }

  // handle uploaded image
  function handleUploadedImag(e) {
    // setImg(e.target.files[0]);
    setImg(e.target.files[0]);
  }

  // clear function
  function clear() {
    setShowPostEdit(false);
    setShowOptions(false);
    setImg("");
    setBody("");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") clear();
  });
  return (
    <>
      {showPostEdit && (
        <div>
          <Textarea
            isClearable
            className="w-full mb-3"
            label="Post Body"
            placeholder=". . . "
            variant="bordered"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />

          {/* uploaded image display  */}
          {post.image && (
            <div className="uploaded-img w-full my-2  ">
              <img
                src={img ? URL.createObjectURL(img) : post.image}
                alt=""
                className="w-full max-h-80 object-cover"
              />
            </div>
          )}

          <div className="flex justify-between  items-center px-5">
            <div className="flex  items-center gap-1 ">
              <MdOutlineFileUpload className="text-rose-500 size-6" />
              <label className=" flex items-center  cursor-pointer ">
                <span className=" text-base leading-normal text-gray-500">
                  Select a photo
                </span>
                <input
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    handleUploadedImag(e);
                  }}
                />
              </label>
            </div>

            <div className="btns ">
              <Button
                size="sm"
                className="me-2 "
                color="danger"
                variant="bordered"
                onClick={() => {
                  setShowPostEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="success"
                variant="solid"
                isDisabled={!img && !body}
                onClick={() => {
                  updatePost();
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
