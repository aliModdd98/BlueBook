import "./Comments.css";

// Function to generate a random name
const generateRandomName = () => {
  const names = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona"];
  return names[Math.floor(Math.random() * names.length)];
};

// Function to generate a random image URL
const generateRandomImage = () => {
  const randomId = Math.floor(Math.random() * 100) + 1;
  return `https://randomuser.me/api/portraits/thumb/men/${randomId}.jpg`;
};

const Comments = ({ comment }) => {
  const randomName = generateRandomName();
  const randomImage = generateRandomImage();

  return (
    <li className="comment-item">
      <img src={randomImage} alt={randomName} className="comment-image" />
      <div className="comment-content">
        <h4>{randomName}</h4>
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comments;
