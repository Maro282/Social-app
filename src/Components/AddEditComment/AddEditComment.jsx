import { Button, Input, Textarea } from "@heroui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function AddEditComment({ postId, getPostComments }) {
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { userToken } = useContext(AuthContext);

  // Add comment function
  function addComment() {
    setIsLoading(true);
    const body = {
      content: commentContent,
      post: postId,
    };

    toast.promise(
      axios
        .post("https://linked-posts.routemisr.com/comments", body, {
          headers: {
            token: userToken,
          },
        })
        .then((response) => {
          if (response.data.message == "success") {
            setIsLoading(false);
            setCommentContent("");
            getPostComments();
          }
        })
        .catch((err) => {
          alert(err.message);
          setIsLoading(false);
        }),
      {
        loading: "Adding comment . . ",
        success: "Comment added successfully! 😎",
        error: "Couldn't add comment right now ",
      }
    );
  }

  return (
    <div className=" relative flex flex-col ">
      <Input
        label="Comment"
        placeholder=". . "
        className="mb-2 border-1 border-gray-400 rounded-xl"
        value={commentContent}
        onChange={(e) => {
          setCommentContent(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") addComment();
        }}
      />
      <Button
        type="submit"
        variant="flat"
        color="primary"
        size="sm"
        className="font-semibold border-1 border-gray-400 rounded-xl self-end "
        isDisabled={!commentContent}
        isLoading={isLoading}
        onClick={() => {
          addComment();
        }}
      >
        Add
      </Button>
    </div>
  );
}
