import "./styles/NewPost.css";
import React, { useState } from "react";
import Spinner from "./Spinner";
import { Toaster, toast } from "sonner";
import useShop from "../hooks/useShop";
import useFood from "../hooks/useFood";

function NewPost() {
  const token = localStorage.getItem("token");
  const { shop } = useShop();
  const { isShopOwner } = useFood()
  const [post, setPost] = useState({
    description: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      fetch(`http://localhost:3070/api/v1/post/shop/${shop.profileName}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((response) => {
          if (!response.ok) {
            setError(true);
            setLoading(false);
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Publicacion enviada");
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
    setPost({ description: "" });
  };

  return (
    <>
    {
      isShopOwner &&
      <form onSubmit={handleSubmit}>
        <textarea
          name="description"
          cols="95"
          rows="12"
          placeholder="Que estas pensando?"
          className="new-post__text-area"
          value={post.description}
          onChange={handleChange}
          />
        <div className="new-post__submit">
          <div className="new-post__submit-spinner">
            {loading && <Spinner />}
          </div>
          <input type="submit" value="Publicar" />
        </div>
      </form>
        }
      {error && <h1>Error</h1>}
      <Toaster expand={true} />
    </>
  );
}

export default NewPost;
