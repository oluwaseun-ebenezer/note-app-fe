export default ({ label, type, name }) => {
  return (
    <button
      name={name}
      type={type}
      className="w-full p-4 mb-4 bg-blue-500 text-white"
    >
      {label}
    </button>
  );
};
