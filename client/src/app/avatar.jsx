const Avatar = ({ userId, username }) => {
  return (
    <div className="w-8 h-8 bg-red-200 rounded-full flex items-center">
      <div className="w-full text-center">{username[0]}</div>
    </div>
  );
};

export default Avatar;
