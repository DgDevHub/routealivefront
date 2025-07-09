
export default function SkeletonProblem() {
  return (
    <li className="border p-4 rounded shadow-sm animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
    </li>
  );
}
