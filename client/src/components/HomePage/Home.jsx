import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  // const navigate = useNavigate()
  console.log(user) 

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-white py-6 px-8 lg:px-12">
        <div className="lg:w-1/2  lg:text-left">
          <h2 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
            Welcome Back Geek! <span className="text-indigo-600">{user.email}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 text-justify ">
           A secure authentication login system ensures that only authorized users gain access 
           to an application or system while safeguarding sensitive data. Building such a system
           requires integrating best practices in security protocols, encryption, and user 
           experience design.
          </p>
          
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 flex items-center justify-center">
            <img
             src="https://img.freepik.com/free-vector/windows-concept-illustration_114360-332.jpg?t=st=1731809665~exp=1731813265~hmac=fb417a93536809414991cf92159326c482d8b36c292131a96a3de06ddb087f27&w=740"
             alt='image-home-page'
             className="w-full object-cover"
            />
        </div>
      </div>
    </div>
  );
};

export default Home;
