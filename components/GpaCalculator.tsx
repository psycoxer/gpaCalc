"use client"; // This is a client component because it uses hooks (useState, etc.)

import { useState, FormEvent } from 'react';

export default function GpaCalculator() {
  // State for user inputs
  const [currentSem, setCurrentSem] = useState<string>('1');
  const [currentCGPA, setCurrentCGPA] = useState<string>('');
  const [targetCGPA, setTargetCGPA] = useState<string>('');

  // State for the result and any potential errors
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    
    // Clear previous results
    setResult(null);
    setError(null);

    // Parse inputs from string to numbers
    const sem = parseInt(currentSem);
    const current = parseFloat(currentCGPA);
    const target = parseFloat(targetCGPA);

    // --- Input Validation ---
    if (isNaN(sem) || isNaN(current) || isNaN(target)) {
      setError("Please fill in all fields with valid numbers.");
      return;
    }
    if (current < 1 || current > 10 || target < 1 || target > 10) {
      setError("CGPA values must be between 1 and 10.");
      return;
    }
    if (target < current) {
      setError("Target CGPA cannot be lower than your current CGPA.");
      return;
    }

    // --- Calculation ---
    // Formula: MinimumGPA = (((targetCGPA)*8)-((currentCGPA)*(currentSem)))/(8-currentSem)
    const requiredGPA = ((target * 8) - (current * sem)) / (8 - sem);

    // --- Result Handling ---
    if (requiredGPA > 10) {
      setError(`It's mathematically impossible to reach your target. You would need a GPA of ${requiredGPA.toFixed(2)} in the remaining semesters.`);
    } else if (requiredGPA <= 0) {
       // This case means you've already met or exceeded your target
       setResult(0); // Display 0 or a success message
       setError("Congratulations! You have already surpassed your target CGPA.");
    }
    else {
      setResult(requiredGPA);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Semester Input */}
        <div>
          <label htmlFor="currentSem" className="block text-sm font-medium text-gray-300">
            Your Current Semester
          </label>
          <select
            id="currentSem"
            value={currentSem}
            onChange={(e) => setCurrentSem(e.target.value)}
            className="mt-1 block w-full p-3 bg-white/10 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          >
            {[...Array(7).keys()].map(i => (
              <option key={i + 1} value={i + 1} className="text-black">
                Semester {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Current CGPA Input */}
        <div>
          <label htmlFor="currentCGPA" className="block text-sm font-medium text-gray-300">
            Current CGPA (out of 10)
          </label>
          <input
            type="number"
            id="currentCGPA"
            step="0.01"
            min="1"
            max="10"
            value={currentCGPA}
            onChange={(e) => setCurrentCGPA(e.target.value)}
            placeholder="e.g., 8.5"
            className="mt-1 block w-full p-3 bg-white/10 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          />
        </div>

        {/* Target CGPA Input */}
        <div>
          <label htmlFor="targetCGPA" className="block text-sm font-medium text-gray-300">
            Target CGPA (out of 10)
          </label>
          <input
            type="number"
            id="targetCGPA"
            step="0.01"
            min="1"
            max="10"
            value={targetCGPA}
            onChange={(e) => setTargetCGPA(e.target.value)}
            placeholder="e.g., 9.0"
            className="mt-1 block w-full p-3 bg-white/10 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Calculate
          </button>
        </div>
      </form>

      {/* Result Display */}
      <div className="mt-8 text-center">
        {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
        {result !== null && !error && (
          <div className="bg-green-900/50 p-6 rounded-lg">
            <p className="text-gray-300">You need to maintain a GPA of at least:</p>
            <p className="text-5xl font-bold text-green-400 mt-2">
              {result.toFixed(2)}
            </p>
            <p className="text-gray-400 mt-2">in each of the remaining semesters.</p>
          </div>
        )}
      </div>
    </div>
  );
}