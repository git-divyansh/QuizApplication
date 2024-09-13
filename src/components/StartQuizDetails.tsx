import { useState } from "react";

interface StartQuizDetailsProps {
  setQuizStarted: (started: boolean) => void;
  quizid : string | undefined,
  setNameEmail : (name : string, email : string) => void
}

const StartQuizDetails = ({ setQuizStarted, quizid, setNameEmail }: StartQuizDetailsProps) => {
  // State for storing username and email
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // State for handling errors
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email) {
      setError("Both fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setNameEmail(username, email);

    // If validation passes, reset error and start the quiz
    setError(null);
    console.log(quizid);
    setQuizStarted(true);
  };

  // Function to validate email
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };


  return (
    <div className="p-5 flex justify-center py-40 font-Inter">
        <div className="md:w-1/2">
            <h1 className="text-xl font-bold mb-4 text-white">Enter Your Details to Start the Quiz</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                <label className="block text-sm font-medium text-white">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="Enter your username"
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-white">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="Enter your email"
                    required
                />
                </div>

                {/* Display validation error if exists */}
                {error && <p className="text-red-500">{error}</p>}

                <button
                type="submit"
                className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500"
                onClick={handleSubmit}
                >
                Start Quiz
                </button>
            </form>
        </div>
    </div>
  );
};

export default StartQuizDetails;
