import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DreamForm from "../components/DreamForm";
import Background from "../components/Background";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import calendar from "../assets/calendar.png";
import Loading from "../components/Loading";
import bigcloud from "../assets/bigcloud.png";
import mediumcloud from "../assets/mediumcloud.png";
import smallcloud from "../assets/smallcloud.png";
import star from "../assets/star.png";

const Home = () => {
  const [dreams, setDreams] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dreamContent, setDreamContent] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDreams = async (date) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "x-auth-token": token,
          },
          params: {
            date: formatDate(date)
          }
        };

        const response = await axios.get(
          "https://subconscious-notes.vercel.app/api/dream/today",
          config
        );

        if (response.data.length > 0) {
          setDreamContent(response.data[0].content);
        } else {
          setDreamContent("");
        }
      } catch (error) {
        console.error('Error fetching dreams:', error);
        setDreamContent("");
      }
    };

    fetchDreams(selectedDate);
  }, [selectedDate]);

  const handlePreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    setSelectedDate(previousDate);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Show loading spinner
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };

      const response = await axios.post(
        "https://subconscious-notes.vercel.app/api/dream/save",
        {
          content: dreamContent,
          date: formatDate(selectedDate),
        },
        config
      );

      setDreams((prevDreams) => {
        const existingIndex = prevDreams.findIndex(
          (d) => d.date === formatDate(selectedDate)
        );
        if (existingIndex !== -1) {
          return [
            ...prevDreams.slice(0, existingIndex),
            response.data,
            ...prevDreams.slice(existingIndex + 1),
          ];
        } else {
          return [...prevDreams, response.data];
        }
      });

      setDreamContent(response.data.content);
    } catch (error) {
      console.error('Error saving dream:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setLoading(false);
    window.location.href = "/";
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleDateClick = () => {
    setSelectedDate(new Date());
  };

  const handleCalendarClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Hide date picker after selecting a date
  };

  const formattedDate = formatDate(selectedDate);

  const getStarPosition = (index) => {
    switch (index) {
      case 0:
        return "inset-0 star";
      case 1:
        return "bottom-0 left-0 star";
      case 2:
        return "bottom-20 left-10 star";
      case 3:
        return "bottom-52 left-44 star";
      case 4:
        return "bottom-96 left-16 star";
      default:
        return "inset-y-0 left-0 star";
    }
  };

  return (
    <Background>
      <nav className="mx-7 md:mx-14 mt-7 flex justify-between z-10">
        <img className="" src={logo} alt="" width={170} height={200} />
        <Button onClick={handleLogout} px="px-3" py="py-1" className="w-28 text-[18px] sm:text-[20px] lg:text-[20px]">
          logout
        </Button>
      </nav>

      <section className="flex-grow flex items-center justify-center w-full z-10 px-4 mx-auto mt-5 sm:mt-10">
        <div className="w-full max-w-screen-lg h-full flex flex-col justify-center items-center overflow-auto">
          <div className="flex justify-center items-center gap-5">
            <button
              className="rounded-full border-[0.3rem] h-14 w-14 border-white text-color-1 text-[60px] flex items-center justify-center drop-shadow-md"
              onClick={handlePreviousDate}
            >
              &lt;
            </button>
            <div className="tooltip">
              <h2
                className="text-[2rem] drop-shadow-md cursor-pointer"
                onClick={handleDateClick}
              >
                {formattedDate}
              </h2>
              <div className="tooltip-text">Click to go to current date</div>
            </div>
            <button
              className="rounded-full border-[0.3rem] h-14 w-14 border-white text-color-1 text-[60px] flex items-center justify-center drop-shadow-md"
              onClick={handleCalendarClick}
            >
              <img
                className="border-[0.2rem] border-color-1"
                src={calendar}
                alt="x"
                width={30}
              />
            </button>
          </div>
          {showDatePicker && (
            <div className="absolute top-40 sm:top-48 mx-auto">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                maxDate={new Date()}
                inline
                showYearDropdown
              />
            </div>
          )}
          <div className="flex flex-col text-center mt-5">
            <p className="text-[20px] md:text-[30px] lg:text-[35px] mb-5 w-[400px] sm:w-full">
              What is your dream or subconscious thoughts today?
            </p>
            <DreamForm
              selectedDate={formattedDate}
              setDreams={setDreams}
              dreamContent={dreamContent}
              setDreamContent={setDreamContent}
              onSave={handleSave}
            />
            {loading && <Loading />}
          </div>
        </div>
      </section>

      <img
        className="top-0 -z-10 left-0 cloud-big"
        src={bigcloud}
        alt=""
        width={500}
        height={200}
      />
      <img
        className="top-0 -z-10 left-0 cloud-medium"
        src={mediumcloud}
        alt=""
        width={300}
        height={200}
      />
      <img
        className="-z-10 bottom-28 left-11 cloud-medium2"
        src={mediumcloud}
        alt=""
        width={300}
        height={200}
      />
      <img
        className="bottom-52 left-52 -z-10 cloud-small"
        src={smallcloud}
        alt=""
        width={200}
        height={200}
      />

      <img
        className="top-0 right-80 -z-10 cloud-small2"
        src={smallcloud}
        alt=""
        width={200}
        height={200}
      />
      <img
        className="top-40 right-72 -z-10 cloud-small3"
        src={smallcloud}
        alt=""
        width={200}
        height={200}
      />

      <img
        className="-z-10 top-0 bottom-0 star1"
        src={star}
        alt=""
        width={150}
        height={200}
      />
      <img
        className="-z-10 top-28 bottom-96 star2"
        src={star}
        alt=""
        width={150}
        height={200}
      />
      <img
        className="-z-10 -bottom-5 left-56 star3"
        src={star}
        alt=""
        width={150}
        height={200}
      />
      <img
        className="-z-10 -bottom-72 -left-80 star4"
        src={star}
        alt=""
        width={150}
        height={200}
      />
      <img className="-z-10 star5" src={star} alt="" width={150} height={200} />
    </Background>
  );
};

export default Home;
