type ResultCardProps = {
  children: React.ReactNode;
  title: string;
};

const ResultCard = ({ children, title }: ResultCardProps) => {
  return (
    <div className="w-full px-6 py-4 bg-[#fff] rounded shadow-sm mb-6">
      <h2 className="text-1xl sm:text-2xl font-bold uppercase">{title}</h2>
      {children}
    </div>
  );
};

export default ResultCard;
