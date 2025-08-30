// import styles from "./UpdateCommentComponent.module.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  Input,
} from "@heroui/react";
import { MdOutlineCancel } from "react-icons/md";
import placeholder from "../../assets/placeholder.jpg";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function UpdateCommentComponent({
  comment,
  setIsShow,
  getPostComments,
}) {
  const [selectedCommentContent, setSelectedCommentContent] = useState(
    comment.content
  );
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useContext(AuthContext);

  // update Comment
  function updateComment(commentId) {
    setIsLoading(true);
    axios
      .put(
        "https://linked-posts.routemisr.com/comments/" + commentId,
        {
          content: selectedCommentContent,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((response) => {
        if (response.data.message == "success") {
          getPostComments();
          setIsLoading(false);
          setIsShow(false);
          toast.success("Updated successfully . . ✅ ", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <Card className="w-[90%] mx-auto">
      <CardHeader className="flex gap-3 relative py-7 ">
        <div className="img-box rounded-full">
          <img
            onError={(e) => {
              e.target.src = placeholder;
            }}
            src={comment.commentCreator.photo}
            alt=""
            className="size-12 rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-semibold">{comment.commentCreator.name}</p>
        </div>

        <MdOutlineCancel
          className="text-red-600 text-2xl absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setIsShow(false);
          }}
        />
      </CardHeader>
      <Divider />
      <CardBody>
        <Input
          placeholder=". . "
          variant="flat"
          className="mb-2   rounded-xl"
          value={selectedCommentContent}
          onChange={(e) => {
            setSelectedCommentContent(e.target.value);
          }}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          className="ms-auto"
          variant="shadow"
          color="success"
          isDisabled={!selectedCommentContent.length}
          isLoading={isLoading}
          onClick={() => {
            updateComment(comment._id);
          }}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
