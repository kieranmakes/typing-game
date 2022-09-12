import { useRef } from "react";

const EntryDialogue = ({ updateUser }) => {
  let displayName = useRef("");
  const handleSubmit = () => {
    console.log();
  };

  return (
    <div className="absolute h-screen w-screen">
      <div className="border-2 p-10 rounded-lg mx-auto mt-[150px] w-1/2 flex flex-col items-center">
        <form className="w-[100%]">
          <input
            ref={displayName}
            type="text"
            placeholder="Display Name"
            className="p-5 rounded-lg w-[100%]"
          />
        </form>
        <button
          className="border-2 p-3 rounded-lg mt-10 hover:border-cyan-500 "
          onClick={handleSubmit}
        >
          Create Game
        </button>
      </div>
    </div>
  );
};

export default EntryDialogue;
