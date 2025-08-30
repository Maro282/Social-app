import { TfiCommentAlt } from "react-icons/tfi";
import { BiShare } from "react-icons/bi";
import placeholder from "./../../assets/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AddEditComment from "../AddEditComment/AddEditComment";
import { AuthContext } from "../../Context/AuthContext";
import { MdDeleteForever, MdOutlineFileUpload } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateCommentComponent from "../UpdateCommentComponent/UpdateCommentComponent";
import EditPost from "../AddEditPost/EditPost";
export default function PostCard({ post, from, getAllPosts }) {
  const navigate = useNavigate();
  const [commentsLimit, setCommentsLimit] = useState(2);
  const { userData } = useContext(AuthContext);
  const [comments, setComments] = useState(null);
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [showOptions, setShowOptions] = useState("hidden");
  const [showPostEdit, setShowPostEdit] = useState(false);

  function getPostComments() {
    axios
      .get(`https://linked-posts.routemisr.com/posts/${post._id}/comments`, {
        headers: {
          token: userToken,
        },
      })
      .then((response) => {
        setComments(response.data.comments);
      });
  }

  // Delete comment
  function deleteComment(commentId) {
    toast.promise(
      axios
        .delete("https://linked-posts.routemisr.com/comments/" + commentId, {
          headers: {
            token: userToken,
          },
        })
        .then((response) => {
          if (response.data.message == "success") {
            getPostComments();
          }
        })
        .catch((err) => {
          alert(err);
        }),
      {
        loading: "Processing . . ⌛",
        success: "Deleted Successfully . . ✅",
        error: "Something went wrong . . ❌",
      }
    );
  }

  //Delete Post
  function deletePost() {
    toast.promise(
      axios
        .delete("https://linked-posts.routemisr.com/posts/" + post._id, {
          headers: {
            token: userToken,
          },
        })
        .then((response) => {
          if (response.data.message == "success") {
            getAllPosts();
          }
        })
        .catch((err) => {
          alert(err);
        }),
      {
        loading: "Processing . . ⌛",
        success: "Deleted Successfully . . ✅",
        error: "Something went wrong . . ❌",
      }
    );
  }

  //sharing post
  async function sharePost(body, img) {
    const response = await fetch(img);
    const blob = await response.blob();

    //turn into file
    const file = new File([blob], "shared-img.jpg", { type: blob.type });
    const formData = new FormData();
    body && formData.append("body", body);
    img && formData.append("image", file);

    axios
      .post("https://linked-posts.routemisr.com/posts", formData, {
        headers: {
          token: userToken,
        },
      })
      .then((response) => {
        if (response.data.message == "success") {
          {
            toast.success("Post Shared !", { position: "top-right" });
            getAllPosts();
          }
        }
      })
      .catch((err) => {
        toast.error("Something went wrong ! \n" + err.message, {
          position: "top-right",
        });
      });
  }

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <>
      <div className=" bg-gray-  p-4 mb-8 rounded-lg shadow-xl border-1 border-gray-200 ">
        <div className="post-header flex justify-between items-center ">
          <div className="flex gap-1.5 items-center">
            <div className="img-box rounded-full">
              <img
                src={post.user.photo}
                alt=""
                className="size-12 rounded-full"
              />
            </div>
            <div className="user-details flex flex-col items-start">
              <h1 className="font-bold text-lg">{post.user.name}</h1>
              <p className="date text-sm  text-sky-700">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="relative ">
            <BsThreeDots
              className="cursor-pointer"
              onClick={() => {
                showOptions ? setShowOptions("") : setShowOptions("hidden");
              }}
            />

            {userData._id === post.user._id ? (
              <ul
                className={` post-actions bg-white absolute -left-[70px] p-2 flex flex-col gap-2 text-black ${showOptions} shadow-2xl`}
              >
                <li
                  className=" hover:cursor-pointer font-semibold transition-all duration-200 hover:border-b-1 text-center text-teal-800 "
                  onClick={() => {
                    setShowPostEdit(true);
                  }}
                >
                  Edit
                </li>
                <li
                  className=" hover:cursor-pointer font-semibold transition-all duration-200 hover:border-b-1 text-center text-red-800"
                  onClick={() => {
                    deletePost();
                  }}
                >
                  Delete
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="post-body p-5  ">
          <p className="mb-3 text-start px-2 break-words"> {post?.body}</p>
          <div className="post-img">
            <img
              src={post?.image}
              alt=""
              className={post.image ? " w-full h-80 object-cover" : ""}
            />
          </div>
        </div>

        <div className="post-comments">
          <div className="comments-details flex justify-between items-center p-1  border-b-2 border-sky-700">
            <div className="flex gap-2 items-center">
              <TfiCommentAlt
                className="text-sky-700 text-bold text-lg
                    "
              />
              <p
                className="font-semibold text-lg
                    "
              >
                Comments
                <span className="ms-1">({comments?.length})</span>
              </p>
            </div>

            {/* Condition of the share option */}
            {from == "profile" ? (
              ""
            ) : (
              <div
                className="flex gap-2 items-center cursor-pointer group"
                onClick={() => {
                  sharePost(post.body, post.image);
                }}
              >
                <BiShare
                  className="text-sky-700 text-bold text-lg
                    "
                />

                <p
                  className="font-semibold text-lg group-hover:underline group-hover:underline-offset-3
                    "
                >
                  Share
                </p>
              </div>
            )}
          </div>

          <div className="comments p-4">
            {comments ? (
              comments?.length ? (
                comments.slice(0, commentsLimit).map((comment) => {
                  return (
                    <div
                      className={`comment flex-col gap-1.5   p-2 mt-2 shadow shadow-sky-700  rounded-lg `}
                      key={comment._id}
                    >
                      {/* Comment card for edit */}
                      {isShow && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 bg-sky-100/30 flex items-center justify-center  z-50 ">
                          <UpdateCommentComponent
                            comment={selectedComment}
                            setIsShow={setIsShow}
                            getPostComments={getPostComments}
                          />
                        </div>
                      )}

                      <div className="flex justify-between items-center gap-1.5">
                        <div className="comment-left-side flex justify-between items-center gap-1.5">
                          <div className="comment-creater-post rounded-full ">
                            <img
                              onError={(e) => {
                                e.target.src = placeholder;
                              }}
                              src={comment.commentCreator.photo}
                              alt=""
                              className="size-10 rounded-full"
                            />
                          </div>
                          <div className="comment-details flex flex-col items-start">
                            <h1 className="font-semibold text-md">
                              {comment.commentCreator.name}
                            </h1>
                            <p className="ms-2 ">{comment.content}</p>
                          </div>
                        </div>

                        <div className="comment-right-side ">
                          {comment.commentCreator._id === userData._id ? (
                            <div className="actions flex gap-1.5 justify-end">
                              {isLoading ? (
                                <div className="flex  items-center space-x-2 animate-pulse">
                                  <div className="size-2 bg-sky-500 rounded-full"></div>
                                  <div className="size-1.5 bg-rose-500 rounded-full"></div>
                                  <div className="size-1 bg-yellow-500 rounded-full"></div>
                                </div>
                              ) : (
                                <CiEdit
                                  className="text-green-900 size-6 cursor-pointer "
                                  onClick={() => {
                                    setSelectedComment(comment);
                                    setIsShow(true);
                                  }}
                                />
                              )}

                              <MdDeleteForever
                                className="text-red-600 size-6 cursor-pointer"
                                onClick={() => {
                                  deleteComment(comment._id);
                                }}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Comment time */}
                      <p
                        style={{
                          fontSize: "12px",
                        }}
                        className="text-amber-950 self-end  text-end dark:text-sky-700"
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  );
                })
              ) : (
                "No Comments"
              )
            ) : (
              <div className="flex items-center justify-center  p-5  w-full">
                <div className="flex space-x-2 animate-pulse">
                  <div className="size-2 bg-sky-500 rounded-full"></div>
                  <div className="size-2 bg-rose-500 rounded-full"></div>
                  <div className="size-2 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="add-comments px-4">
          <AddEditComment postId={post._id} getPostComments={getPostComments} />
        </div>

        {/* Check number of post comments */}
        {comments?.length > 2 &&
          (from ? (
            <p
              className="cursor-pointer text-gray-700 text-sm dark:text-white w-fit mx-auto"
              onClick={() => {
                setCommentsLimit(commentsLimit + 5);
              }}
            >
              {commentsLimit >= comments.length ? "" : "See More . . "}
            </p>
          ) : (
            <p
              className="cursor-pointer text-gray-700 text-sm dark:text-white w-fit mx-auto"
              onClick={() => {
                navigate("/details/" + post._id);
              }}
            >
              See details . .
            </p>
          ))}
      </div>

      {/* UI FOR EDITING POST */}
      {showPostEdit && (
        <div className="postEditCard fixed top-1/2 bottom-0 right-0 left-0 bg-white dark:bg-gray-950 rounded-lg shadow-2xl p-5 items-center justify-center z-50  w-[90%] md:w-[50%]  mx-auto h-fit transform -translate-y-1/2  ">
          <div className="w-[90%] mx-auto">
            <EditPost
              setShowPostEdit={setShowPostEdit}
              showPostEdit={showPostEdit}
              post={post}
              getAllPosts={getAllPosts}
              setShowOptions={setShowOptions}
            />
          </div>
        </div>
      )}
    </>
  );
}
