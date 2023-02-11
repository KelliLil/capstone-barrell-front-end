import PropTypes from "prop-types";

export default function Button({ type, color, text }) {
  const colorVariants = {
    blue: "bg-purple-600 hover:bg-purple-500 text-white",
    green: "bg-green-500 hover:bg-green-400 text-white",
    red: "bg-red-500 hover:bg-red-400 text-white",
    yellow: "bg-yellow-300 hover:bg-yellow-400 text-black",
    purple: "bg-purple-600 hover:bg-purple-500 text-white",
  };

  return (
    <button
      type={type}
      className={`${colorVariants[color]} rounded px-4 py-2 shadow-sm`}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  color: "purple",
  type: "button",
};

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
};
