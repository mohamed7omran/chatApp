const Avatar = ({ userId, username }) => {
  // Array of background colors
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-teal-200",
  ];

  // Convert hexadecimal userId to base-10
  const userIdBase10 = parseInt(userId, 16);

  // Calculate color index based on userId
  const colorIndex = userIdBase10 % colors.length;

  // Select color from colors array based on colorIndex
  const color = colors[colorIndex];

  // Return JSX for the Avatar component
  return (
    <div className={"w-8 h-8 rounded-full flex items-center " + color}>
      <div className="w-full text-center opacity-70">{username[0]}</div>
    </div>
  );
};

export default Avatar;
