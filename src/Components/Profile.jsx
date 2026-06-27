const Profile = ({ name }) => {
  const intials = name[0].toUpperCase();
  return (
    <div className="rounded-[50%] border border-rim aspect-square p-6 flex justify-center text-content font-bold text-lg">
      <div className="flex items-center">{intials}</div>
    </div>
  );
};

export default Profile;
