import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import PostCard from "../../Components/PostCard/PostCard";
import AddEditPost from "../../Components/AddEditPost/AddEditPost";
import { useQuery } from "@tanstack/react-query";

export default function Posts() {
  document.title = "Posts";
  // const [posts, setPosts] = useState([]);
  const { userToken } = useContext(AuthContext);

  // Function to get all posts

  // = = = = = = =  work without Tanstack = = = = = = =
  // function getAllPosts() {
  //   axios
  //     .get("https://linked-posts.routemisr.com/posts", {
  //       params: {
  //         limit: 50,
  //       },
  //       headers: {
  //         token: userToken,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.message == "success") {
  //         setPosts(response.data.posts);
  //         console.log(response.data.posts);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  function getData() {
    return axios.get("https://linked-posts.routemisr.com/posts", {
      params: {
        limit: 50,
      },
      headers: {
        token: userToken,
      },
    });
  }
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getData,
  });

  if (isLoading) {
    return (
      <div className="flex  mx-auto items-center justify-center w-[90%] md:w-[70%]">
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
    );
  }

  if (error) {
    return (
      <h1 className="bg-red-500 text-white text-2xl p-8 text-center font-semibold rounded-lg shadow-lg ">
        {error.message}
      </h1>
    );
  }

  return (
    <main className="lg:w-[60%] mx-auto w-[90%] ">
      <div className=" rounded-lg mb-5  p-2 shadow dark:bg-gray-800 ">
        <AddEditPost getAllPosts={refetch} />
      </div>

      {data?.data?.posts && (
        <>
          {data?.data?.posts.length
            ? data.data.posts.reverse().map((post) => {
                return (
                  <div key={post._id}>
                    <PostCard post={post} getAllPosts={refetch} />
                  </div>
                );
              })
            : "No Posts yet"}
        </>
      )}
    </main>
  );
}
