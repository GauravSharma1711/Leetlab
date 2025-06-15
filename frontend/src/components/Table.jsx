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
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // helper function to return color class
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'text-green-100 bg-green-600';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="overflow-x-auto min-h-screen w-6xl">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Is Solved</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map((e, index) => (
            <tr key={e.id || index}>
              <th>
                <input
                  type="checkbox"
                  checked={e.solvedBy.includes(authUser?.id)}
                  readOnly
                  className="checkbox"
                />
              </th>
              <td>
                <Link to={`/problem/${e.id}`} >
                {e.title}
                </Link>
                </td>
              <td>
                <span className={`px-3 py-1 rounded-full font-semibold text-sm ${getDifficultyColor(e.difficulty)}`}>
                  {e.difficulty}
                </span>
              </td>
              <td>{e.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
