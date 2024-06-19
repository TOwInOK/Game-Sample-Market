"use client";
import React, { useState } from "react";

const Page: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEulaChecked, setIsEulaChecked] = useState<boolean>(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEulaChange = () => {
    setIsEulaChecked(!isEulaChecked);
  };

  const handleSubmit = () => {
    // You can handle form submission here
    console.log("Login:", login);
    console.log("Password:", password);
    console.log("Email:", email);
    console.log("EULA Checked:", isEulaChecked);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="px-2.5 py-5 rounded-lg border-2 border-black dark:border-white justify-center items-end gap-2.5 inline-flex">
        <div className=" text-3xl font-normal font-itim">Login:</div>
        <input
          type="text"
          value={login}
          onChange={handleLoginChange}
          className="w-full border-b-4 border-black dark:border-white"
        />
      </div>
      <div className="px-2.5 py-5 rounded-lg border-2 border-black dark:border-white justify-center items-end gap-2.5 inline-flex">
        <div className=" text-3xl font-normal font-itim">Password:</div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full border-b-4 border-black dark:border-white"
        />
      </div>
      <div className="px-2.5 py-5 rounded-lg border-2 border-black dark:border-white justify-center items-end gap-2.5 inline-flex">
        <div className=" text-3xl font-normal font-itim">Email:</div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full border-b-4 border-black dark:border-white"
        />
      </div>
      <div className="px-2.5 py-5 rounded-lg border-2 border-black dark:border-white justify-center items-end gap-2.5 inline-flex">
        <input
          type="checkbox"
          checked={isEulaChecked}
          onChange={handleEulaChange}
          className="mr-3"
        />
        <div className=" text-3xl font-normal font-itim">
          I agree to the EULA
        </div>
      </div>
      <div
        className="transition duration-300 ease-in-out transform hover:scale-105 p-2.5 rounded-lg border-2 border-black dark:border-white flex-col justify-center items-center gap-2.5 flex cursor-pointer"
        onClick={handleSubmit}
      >
        <div className=" text-3xl font-normal font-itim">Submit</div>
      </div>
    </div>
  );
};

export default Page;
