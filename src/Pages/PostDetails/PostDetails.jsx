import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import PostCard from "../../Components/PostCard/PostCard";

export default function PostDetails() {
  const { postId } = useParams();
  const { userToken } = useContext(AuthContext);
  const [postDetails, setPostDetails] = useState();

  // function to get single post

  function getPost() {
    axios
      .get("https://linked-posts.routemisr.com/posts/" + postId, {
        headers: { token: userToken },
      })
      .then((response) => {
        if (response.data.message == "success") {
          setPostDetails(response.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="w-[90%] mx-auto lg:w-[60%]">
      {postDetails ? (
        <PostCard post={postDetails} from={"details"} />
      ) : (
        <div className="flex  mx-auto items-center justify-center">
          <div className="w-full">
            <div className=" rounded overflow-hidden shadow-lg animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="px-6 py-4">
                <div className="h-6 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 w-2/3"></div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-300 w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
