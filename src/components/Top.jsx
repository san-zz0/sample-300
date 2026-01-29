const Top = () => {
  return (
    <div className="flex gap-3 justify-end items-center p-3 border-b border-gray-400">
      <img
        src={null}
        className="w-11 h-11 object-cover rounded-full"
        alt="Admin"
      />
      <div>
        <h2 className="text-gray-800 font-semibold">Admin</h2>
        <p className="text-gray-700">admin@gmail.com</p>
      </div>
    </div>
  );
};

export default Top;
