import React, { useState } from "react";

export const Form = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSub = () => {};
  
  return (
    <div className="flex flex-1 mb-10 bg-slate-100 mx-8 justify-center md:self-center md:w-4/6 lg:w-3/6 rounded-md border">
      <div className="flex flex-col py-4">
        {/* TODO: Hide if the user is alr logged in */}
        <h2 className="font-Space-Grotesk text-xl font-semibold text-center">
          Subscribe to Our Newsletter
        </h2>
        <div className="flex justify-center space-x-3">
          {/* TODO: Add email pattern validation */}
          <input
            type="email"
            className="shadow border rounded text-gray-600 my-2 px-4 py-1"
            placeholder="satoshi@gmail.com"
            size={30}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
          />
          <button
            className="bg-purple-500 hover:bg-purple-700 shadow text-white font-bold my-2 py-2 px-2 rounded focus:outline-none focus:shadow-outline disabled:transform-none disabled:transition-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white"
            type="button"
            // TODO: Add this state management + form with external newsletter management api
            onClick={() => handleNewsletterSub()}
            disabled={!email.length}
          >
            {" "}
            I'm ready
          </button>
        </div>
      </div>
    </div>
  );
};
