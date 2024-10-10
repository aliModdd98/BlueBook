import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import axios from "axios";
import "./PostsPage.css";
import Post from "../Posts/Posts";

// Lazy load the Comments component
const Comments = lazy(() => import("./../Comments/Comments"));

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Fetch posts from the API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  // Fetch comments for the selected post
  useEffect(() => {
    if (selectedPostId !== null) {
      setLoadingComments(true);
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`
        )
        .then((response) => {
          setComments(response.data);
          setLoadingComments(false);
          setIsPanelOpen(true); // Open the panel when comments are loaded
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setLoadingComments(false);
        });
    }
  }, [selectedPostId]);

  // Memoize posts list to avoid re-rendering when comments change
  const memoizedPosts = useMemo(
    () =>
      posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          description={post.body}
          name="John Doe"
          onClick={() => setSelectedPostId(post.id)}
        />
      )),
    [posts]
  );

  // Close the comments panel
  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedPostId(null);
  };

  return (
    <div className="posts-page">
      <div className="posts-list">
        <h2 className="heading">Posts</h2>
        {loading ? (
          <div className="loader">Loading posts...</div>
        ) : (
          memoizedPosts
        )}
      </div>

      <Suspense fallback={<div className="loader">Loading comments...</div>}>
        <div className={`comments-panel ${isPanelOpen ? "open" : ""}`}>
          <div className="heading">
            <h2>Comments</h2>
            <button className="close-button" onClick={closePanel}>
              ×
            </button>
          </div>
          {selectedPostId === null ? (
            <p>Select a post to view comments.</p>
          ) : loadingComments ? (
            <div className="loader">Loading comments...</div>
          ) : comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <Comments key={comment.id} comment={comment} />
              ))}
            </ul>
          ) : (
            <p>There are no comments now.</p>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default PostsPage;
