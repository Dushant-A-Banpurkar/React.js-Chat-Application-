


// eslint-disable-next-line react/prop-types
const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-12 h-12" : "w-8 h-8";

  return (
    <div className={`flex items-center justify-center ${sizeClass}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-white ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;
