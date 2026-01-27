const Top = () => {
  return (
    <div className="flex gap-3 justify-end p-3 border-b border-gray-400">
      <img
        src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/cat-face-by-jonathan-fife.jpg"
        className="w-12 h-12 object-cover rounded-full"
      />
      <div>
        <h2 className="text-gray-900 font-semibold">Admin</h2>
        <p className="text-gray-600">admin@gmail.com</p>
      </div>
    </div>
  );
};

export default Top;
