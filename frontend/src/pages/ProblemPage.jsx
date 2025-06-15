import { useParams, Link } from 'react-router-dom';
import useProblemStore from '../store/problemStore';
import { useEffect, useState } from 'react';
import { ChevronLeft } from "lucide-react";

const ProblemPage = () => {
  const { id } = useParams();
  const languages = ["JAVA", "PYTHON", "JAVASCRIPT"];
  const [language, setLanguage] = useState('JAVASCRIPT');

  const { problem, isProblemLoading, getProblemById } = useProblemStore();

 let badgeType = "error"; // default value
if (problem && problem.difficulty) {
  const difficulty = problem.difficulty.toLowerCase();
  badgeType = difficulty === "easy"
    ? "success"
    : difficulty === "medium"
      ? "warning"
      : "error";
}



  useEffect(() => {
    getProblemById(id);
  }, [id, getProblemById]);

  if (isProblemLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className='p-4'>

      {/* TOP DIV */}
      <div className='flex justify-between items-center mb-4'>
        <Link to="/problems" className='flex items-center gap-2'>
          <ChevronLeft />
          Back to Problems
        </Link>
        <div className='flex gap-2'>
          <button className="btn btn-outline btn-primary">Reset Code</button>
          <button className="btn btn-soft btn-primary">Run Code</button>
          {/* LANGUAGE Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-primary">Language</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-6 shadow-sm">
              {languages.map((item) => (
                <li key={item}>
                  <a onClick={() => setLanguage(item)}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

     
     <div className=' w-full min-h-screen flex '>
        <div className=' w-1/2 mt-8 '>
        
        {
            problem && (
                <div className=' flex flex-col'>
                    <h1 className=' font-bold text-4xl'>{problem?.title}</h1>
                    <div className=' flex gap-2 mt-4' >
                    <div className={`badge badge-${badgeType}`}>{problem?.difficulty}</div>
                    </div>
                    <p className=' mt-4 text-slate-300' >{problem?.description}</p>

         <div className='flex flex-col mt-4 text-white'>
  <h2 className='font-semibold text-xl mb-2'>Examples:</h2>
  {problem?.examples && Object.entries(problem.examples).map(([lang, example]) => (
    <div key={lang} className='mb-4 p-4 bg-gray-800 rounded'>
     
      <p><strong>Input:</strong> {example.input}</p>
      <p><strong>Output:</strong> {example.output}</p>
      <p><strong>Explanation:</strong> {example.explanation}</p>
    </div>
  ))}
</div>


<div className='mt-4 text-white'>
  <h2 className='font-semibold text-xl mb-2'>Constraints:</h2>
  {
    Array.isArray(problem?.constraints) ? (
      <ul className='list-disc list-inside'>
        {problem?.constraints.map((constraint, index) => (
          <li key={index}>{constraint}</li>
        ))}
      </ul>
    ) : (
      <p>{problem?.constraints}</p>  
    )
  }
</div>


<div className='mt-4 text-white'>
  <h2 className='font-semibold text-xl mb-2'>Tags:</h2>
 
  {problem?.tags && problem.tags.map((e,index)=>(
    <div key={index} className="badge badge-ghost p-3 ">{e}</div>
  ))}
</div>


                </div>
            )
        }

        </div>
        <div className=' w-1/2 mt-8'>right</div>
     </div>
      

      

    </div>
  );
};

export default ProblemPage;
