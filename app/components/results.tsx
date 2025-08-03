type Resultsprop = { accuracy: number; wpm: number };

export default function Results({ accuracy, wpm }: Resultsprop) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 p-6 mt-3 rounded-lg shadow-lg mr-10">
      <div className="text-[var(--result-color)] text-4xl m-auto mb-4">
        wpm
        <div className="text-5xl text-[var(--result-color)] font-bold">{wpm.toFixed(0)}</div>
      </div>
      <div className="text-[var(--result-color)] text-4xl m-auto">
        acc
        <div className="text-5xl text-[var(--result-color)] font-bold">{accuracy.toFixed(0)}%</div>
      </div>
    </div>
  );
}
