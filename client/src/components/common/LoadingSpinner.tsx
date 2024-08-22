type LoadingSpinnerProps = {
  message?: string;
};

//Make sure the parent div is relative to make this work
const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="spinner mr-2"></div>
      {message && <p className="animate-pulse">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
