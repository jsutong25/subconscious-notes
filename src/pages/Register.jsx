import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Background from "../components/Background";
import logo from "../assets/logo.png";
import bigcloud from "../assets/bigcloud.png";
import mediumcloud from "../assets/mediumcloud.png";
import smallcloud from "../assets/smallcloud.png";
import star from "../assets/star.png";
import Loading from "../components/Loading";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("https://subconscious-notes.vercel.app/api/auth/register", {
        username,
        password,
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="w-screen h-screen z-10 flex flex-col justify-center items-center">
        <div className="absolute top-0 mt-14">
          <img
            className="w-80"
            src={logo}
            alt="subconscious notes"
            width={500}
            height={500}
          />
        </div>

        <div className="flex flex-col justify-center text-center">
          <h3 className="text-[40px] text-white mb-2 drop-shadow-md">
            register
          </h3>
          <form
            className="flex flex-col sm:w-[30rem] md:w-[35rem] sm:mx-auto gap-5 mx-8"
            onSubmit={handleRegister}
          >
            <input
              className="rounded-full text-center text-[30px] text-white bg-transparent border-[7px] outline-none border-white px-[2rem] py-[.2rem]"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="rounded-full text-center text-[30px] text-white bg-transparent border-[7px] outline-none border-white px-[2rem] py-[.2rem]"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-start items-center">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2 hidden"
              />
              <label
                htmlFor="show-password"
                className="custom-checkbox"
              ></label>
              <label
                htmlFor="show-password"
                className="text-white text-[20px] ml-2"
              >
                show password
              </label>
            </div>
            <Button className="text-[30px] mt-5" px="px-[2rem]" py="py-[.2rem]">
              register
            </Button>
            <a className="text-[20px] drop-shadow-md" href="/">
              already have an account?{" "}
              <span className="text-color-1 underline">login here</span>
            </a>
          </form>
        </div>
      </div>

      { loading && <Loading />}

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

export default Register;
