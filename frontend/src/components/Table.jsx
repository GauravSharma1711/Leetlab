import React, { useEffect } from 'react';
import useProblemStore from '../store/problemStore';
import useAuthStore from '../store/authStore';
import { Link } from 'react-router-dom';

const Table = ({ difficulty, search }) => {
  const { problems, getAllProblems, isProblemsLoading } = useProblemStore();
  const { authUser } = useAuthStore();

 
  

  useEffect(() => {
    getAllProblems();
  }, []);

  const filteredProblems = problems
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) =>
      difficulty === "ALL" ? true : p.difficulty.toLowerCase() === difficulty.toLowerCase()
    );

  if (isProblemsLoading) {
    return (
      <div className="flex justify-center items-center py-12"> {/* Adjusted padding */}
        <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></span> {/* Custom Tailwind spinner */}
      </div>
    );
  }

  // helper function to return color class for difficulty badge
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'bg-green-600 text-green-100'; // Darker green background, light text
      case 'medium':
        return 'bg-yellow-600 text-yellow-100'; // Darker yellow background, light text
      case 'hard':
        return 'bg-red-600 text-red-100';     // Darker red background, light text
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-700 bg-gray-800"> {/* Added card styling */}
      {filteredProblems.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-lg">
          No problems found matching your criteria.
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-700"> {/* Full width table, row divider */}
          <thead className="bg-gray-700"> {/* Header background */}
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Solved
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Difficulty
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700"> {/* Body background and row divider */}
            {filteredProblems.map((p, index) => (
              <tr key={p.id || index} className="hover:bg-gray-700 transition-colors duration-200"> {/* Hover effect for rows */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={p.solvedBy?.some(solved => solved.userId === authUser?.id)}

                    readOnly
                    className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" // Styled checkbox
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 hover:text-blue-300">
                  <Link to={`/problem/${p.id}`} className="hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(p.difficulty)}`}>
                    {p.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {p.tags && p.tags.length > 0 ? p.tags.join(', ') : 'N/A'} {/* Handle empty tags */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;