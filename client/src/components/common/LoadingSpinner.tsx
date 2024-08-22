type LoadingSpinnerProps = {
  message?: string;
};

//Make sure the parent div is relative to make this work
const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-75 bg-[#f1f1f4] rounded">
      <div className="spinner mr-2"></div>
      {message && <p className="animate-pulse font-medium">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
