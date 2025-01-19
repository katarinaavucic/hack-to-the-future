// 'use client'

// import React, { useState } from "react";
// import { generateAnswer } from "../actions/cohereAction";
// import { Button } from "./ui/button";
// // import { Input } from "@/components/ui/input";
// import { Input } from "./ui/input";

// const CohereAI = () => {
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!userInput.trim()) {
//       alert("Please enter a question!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await generateAnswer(userInput);
//       // Here, instead of setting the response in state, you can pass it to a parent component or handle it as needed
//       console.log(response); // For demonstration purposes
//     } catch (error) {
//       console.error("Error generating answer:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <Input
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         placeholder="Type your question here..."
//         disabled={loading}
//       />
//       <Button onClick={handleGenerate} disabled={loading}>
//         {loading ? "Generating..." : "Generate Answer"}
//       </Button>
//     </div>
//   );
// };

// export default CohereAI;

'use client';

import React, { useState } from "react";
import { generateAnswer } from "../actions/cohereAction";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CohereAI = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(""); // State to store the generated answer
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to store error messages

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError("Please enter a valid question.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous error messages
    setResponse(""); // Clear previous response

    try {
      const generatedResponse = await generateAnswer(userInput);
      setResponse(generatedResponse); // Store the response in state
    } catch (error) {
      setError("An error occurred while generating the answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <Input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your question here..."
        disabled={loading}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Answer"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="font-semibold">Generated Answer:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default CohereAI;
