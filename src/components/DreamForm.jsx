import React, { useEffect } from "react";
import Button from "./Button";

const DreamForm = ({ selectedDate, setDreams, dreamContent, setDreamContent, onSave }) => {

  const handleChange = (e) => {
    setDreamContent(e.target.value); // Update dreamContent in Home.jsx
  };

  const handleSave = async (e) => {
    e.preventDefault();
    onSave(e); // Call the onSave function passed from Home.jsx
  };

  return (
    <form
      className="flex flex-col justify-center items-center mx-auto max-w-full"
      onSubmit={handleSave}
    >
      <textarea
        value={dreamContent} // Bind the value to the dreamContent prop
        onChange={handleChange} // Update dreamContent in Home.jsx directly
        placeholder="describe your subconscious thoughts. . ."
        className="w-[20rem] sm:w-[30rem] md:w-[40rem] lg:w-[60rem] h-[23rem] md:h-[26rem] lg:h-[30rem] max-w-full bg-color-2 border-4 rounded-3xl p-4 text-[1rem] md:text-[1.5rem] lg:text-[1.7rem] tracking-widest"
      />
      <Button className="mt-5 w-full text-[2.2rem]" py="py-1">
        save
      </Button>
    </form>
  );
};

export default DreamForm;
