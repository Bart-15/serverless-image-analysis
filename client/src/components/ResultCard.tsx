type ResultCardProps = {
  children: React.ReactNode;
  title: string;
};

const ResultCard = ({ children, title }: ResultCardProps) => {
  return (
    <div className="w-full px-6 py-4 backdrop-blur-sm bg-white/30 rounded shadow-sm mb-6">
      <h2 className="text-1xl font-bold uppercase text-black mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default ResultCard;
