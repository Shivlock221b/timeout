import React from 'react';
import { Link } from 'react-router-dom';

// Following Single Responsibility Principle - CallToAction only handles the CTA section
const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700 text-white relative overflow-hidden mx-auto my-12 max-w-[100vw] rounded-[2.5rem]">
      {/* Abstract shapes for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -left-10 -top-10 bg-white rounded-full w-40 h-40 blur-xl"></div>
        <div className="absolute right-10 bottom-0 bg-indigo-300 rounded-full w-60 h-60 blur-xl"></div>
        <div className="absolute left-1/2 top-1/2 bg-purple-400 rounded-full w-40 h-40 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to connect with real people?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          It is your chance to make new friends, build your community and experience your city like never before.
        </p>
        <div className="flex justify-center">
          <Link
            to="/signup"
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-12 py-5 rounded-full font-semibold text-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
