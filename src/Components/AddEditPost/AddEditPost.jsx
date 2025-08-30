import { useContext, useState } from "react";
import { Textarea } from "@heroui/react";
import { Button } from "@heroui/react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function AddEditPost({ getAllPosts }) {
  const [isShow, setIsShow] = useState(false);
  const { userToken } = useContext(AuthContext);
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");

  // function to create post
  function addPost() {
    const formData = new FormData();
    body && formData.append("body", body);
    img && formData.append("image", img);

    toast.promise(
      axios
        .post("https://linked-posts.routemisr.com/posts", formData, {
          headers: {
            token: userToken,
          },
        })
        .then((response) => {
          if (response.data.message == "success") {
            {
              console.log("done");
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
        success: "Posted successfully!",
        error: "Can not post",
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
    setIsShow(false);
    setImg("");
    setBody("");
  }

  return (
    <div className="w-full">
      {!isShow && (
        <h4
          className="text-start font-semibold cursor-pointer mb-2 rounded-lg  "
          onClick={() => {
            setIsShow(true);
          }}
        >
          What's in your mind ? 🤔{" "}
        </h4>
      )}
      {isShow && (
        <div>
          <Textarea
            isClearable
            className="w-full mb-3"
            label="Post Body"
            placeholder=". . . "
            variant="bordered"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />

          {/* uploaded image display  */}
          {img && (
            <div className="uploaded-img w-full my-2  ">
              <img
                src={URL.createObjectURL(img)}
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
                  photo
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

            <div className="btns flex ">
              <Button
                size="sm"
                className="me-2 "
                color="danger"
                variant="bordered"
                onClick={() => {
                  clear();
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="primary"
                variant="solid"
                isDisabled={!img && !body}
                onClick={() => {
                  addPost();
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
