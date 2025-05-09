import { getJudge0LanguageId,submitBatch,pollBatchResults } from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";

export const createProblem = async(req,res)=>{
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
      } = req.body;


    if(req.user.role !== 'ADMIN'){
     return res.status(403).json({message:"You are not allowed to create a problem"})
      }

      try {
      
    for(const [language,solutionCode ] of Object.entries(referenceSolutions)){

        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
            return res
              .status(400)
              .json({ error: `Language ${language} is not supported` });
          }

          const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
          }));

          const submissionResults = await submitBatch(submissions);

          const tokens = submissionResults.map((res) => res.token);

          const results = await pollBatchResults(tokens);



          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            console.log("Result-----", result);
         
            if (result.status.id !== 3) {
              return res.status(400).json({
                error: `Testcase ${i + 1} failed for language ${language}`,
              });
            }}

        }
    

        const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
    
    }
       catch (error) {
        console.log(error);
        return res.status(500).json({
          error: "Error While Creating Problem",
        });
      
      }
}

export const getAllProblems = async(req,res)=>{

  try {
    const problems = await db.problem.findMany();
    
    if (!problems) {
      return res.status(404).json({
        error: "No problems Found",
      });
    }

    res.status(200).json({
      sucess: true,
      message: "Message Fetched Successfully",
      problems,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Fetching Problems",
    }); 
  }

}

export const getProblemById = async(req,res)=>{
try {
  const {id} = req.params;
  const problem = await db.problem.findUnique({
    where:{id}
  })

  if (!problem) {
    return res.status(404).json({ error: "Problem not found." });
  }

  return res.status(200).json({
    sucess: true,
    message: "Message Created Successfully",
    problem,
  });
} catch (error) {
  console.log(error);
  return res.status(500).json({
    error: "Error While Fetching Problem by id",
  });
}
}

export const updateProblem = async(req,res)=>{

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;


  if(req.user.role !== 'ADMIN'){
    return res.status(403).json({message:"You are not allowed to update a problem"})
     }

     try {

      const {id} = req.params;

      const problem = await db.problem.findUnique({
        where:{id}
      })

      if(!problem){
        return res.status(404).json({ error: "Problem not found." });
      }

      for(const [language,solutionCode ] of Object.entries(referenceSolutions)){

        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
            return res
              .status(400)
              .json({ error: `Language ${language} is not supported` });
          }

          const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
          }));

          const submissionResults = await submitBatch(submissions);

          const tokens = submissionResults.map((res) => res.token);

          const results = await pollBatchResults(tokens);



          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            console.log("Result-----", result);
         
            if (result.status.id !== 3) {
              return res.status(400).json({
                error: `Testcase ${i + 1} failed for language ${language}`,
              });
            }}

        }

        const newProblem = await db.problem.update({
          where:{id},
          data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            referenceSolutions,
            userId: req.user.id,
          },
        });

   return res.status(201).json({
      sucess: true,
      message: "Message updated Successfully",
      problem: newProblem,
    });


     } catch (error) {
      console.log(error);
        return res.status(500).json({
          error: "Error While updating Problem",
        });
     }


}

export const deleteProblem = async(req,res)=>{

  if (req.user.role !== 'ADMIN') {
  return res.status(403).json({ message: "You are not allowed to delete a problem" });
}

     try {
      const {id} = req.params;

      const problem = await db.problem.findUnique({
        where:{id}
      })

      if(!problem){
        return res.status(404).json({ error: "Problem not found." });
      }

     await db.problem.delete({
        where:{id}
      })

      return res.status(200).json({
        sucess: true,
        message: "Problem deleted Successfully",
     
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error While deleting Problem by id",
      });
    }
}

export const getAllProblemsSolvedByUser = async(req,res)=>{ 
  const userId = req.user.id;
try {
  const problems = await db.problem.findMany({
  where:{
    solvedBy:{
      some:{
        userId : userId
      }
    }
  },
  include:{
    solvedBy:{
      where:{
        userId:req.user.id
      }
    }
  }
  })


   res.status(200).json({
      success:true,
      message:"Problems fetched successfully",
      problems
    })

} catch (error) {
   console.error("Error fetching problems :" , error);
    res.status(500).json({error:"Failed to fetch problems"})
}
}