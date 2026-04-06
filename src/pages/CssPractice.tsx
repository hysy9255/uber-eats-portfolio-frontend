const CssPractice = () => {
  return (
    <div className="h-screen flex flex-col border-4 border-blue-500">
      <header className="shrink-0 h-[60px] border-b">Header</header>

      {/* ❌ min-h-0 없음 */}
      {/* <main className="min-h-0 flex-1 border-4 border-red-500">
        <div className="h-full overflow-y-auto border-4 border-green-500 p-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="mb-2 border p-2">
              Row {i}
            </div>
          ))}
        </div>
      </main> */}
      {/* <div className="flex-1 overflow-y-auto border border-red-500">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="mb-2 border p-2">
            Row {i}
          </div>
        ))}
      </div> */}
      {/* <main className="flex-1 min-h-0 border border-purple-600 bg-purple-200 ">
        <div className="h-full overflow-y-auto border border-red-500">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="mb-2 border p-2">
              Row {i}
            </div>
          ))}
        </div>
      </main> */}
      <section className="flex-1 min-h-0 bg-amber-200">
        {/* <main className="m-10 bg-red-300">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="mb-2 border p-2">
              Row {i}
            </div>
          ))}
        </main> */}
      </section>
    </div>
  );
};

export default CssPractice;

// <div className="h-screen flex flex-col border-4 border-blue-500">
//   <header className="shrink-0 h-[60px] border-b border-black flex items-center px-4">
//     Header
//   </header>

//   <main className="flex-1 min-h-0 border-4 border-red-500">
//     <div className="h-full overflow-y-auto border-4 border-green-500 p-4">
//       {Array.from({ length: 50 }).map((_, i) => (
//         <div key={i} className="mb-2 border p-2">
//           Row {i + 1}
//         </div>
//       ))}
//     </div>
//   </main>
// </div>
