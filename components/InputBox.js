export default ({ placeholder, type, name, handlechange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      className="w-full p-4 mb-4"
      onChange={handlechange}
    />
  );
};
