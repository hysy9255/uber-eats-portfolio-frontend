const CssPractice2 = () => {
  return (
    <div className="h-screen border-4 border-blue-500">
      <div className="h-10 border bg-amber-400 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="mb-2 border p-2">
            Row {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CssPractice2;
