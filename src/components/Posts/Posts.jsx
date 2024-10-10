import { useState, useMemo } from "react";
import "./Post.css";
import { FaEllipsisV } from "react-icons/fa";

// Array of example names
const names = ["Alice", "Bob", "Charlie", "David", "Eve"];

const Post = ({ title, description, onClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  // Generate a random date only once when the component mounts
  const [randomDate] = useState(
    new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toDateString()
  );

  // Generate a random name
  const randomName = useMemo(() => {
    return names[Math.floor(Math.random() * names.length)];
  }, []);

  // Generate a random image URL
  const randomImage = useMemo(() => {
    return `https://picsum.photos/150?random=${Math.floor(
      Math.random() * 1000
    )}`;
  }, []);

  // Memoize the length of the description
  const descriptionLength = useMemo(() => {
    return description.length;
  }, [description]);

  // Handle toggle of options
  const toggleOptions = (event) => {
    event.stopPropagation();
    setShowOptions(!showOptions);
  };

  return (
    <div className="post" onClick={onClick}>
      <img src={randomImage} alt="Post" className="post-image" />
      <div className="post-content">
        <h2 className="post-title">{title}</h2>
        <p className="post-description">{description}</p>
        <p className="post-details">
          By <strong>{randomName}</strong> on <em>{randomDate}</em>
        </p>
        <div className="post-more">
          <FaEllipsisV className="more-icon" onClick={toggleOptions} />
          {showOptions && (
            <div className="options">
              <button className="option-button">Edit Post</button>
              <button className="option-button">Delete Post</button>
              <p className="option-text">{descriptionLength} characters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
