"use client";
import React, { useState } from "react";
import { DM_Serif_Display } from "next/font/google";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/loader/buttonLoading";
import Icons from "@/components/icons";

const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

function Page() {
  // State hooks for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        router.push("/admin");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-12 bg-white drop-shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center font-sans">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-10">
          <div className="rounded-md shadow-sm">
            <div className="">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                id="email"
                placeholder="Enter Email"
                variant="outlined"
                fullWidth
                required
                className="w-full border-gray-300 border p-2 rounded-xl mb-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>
            <div className="">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                  className="w-full border-gray-300 border p-2 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-4 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Icons name={"show-password"} />
                  ) : (
                    <Icons name={"show-password"} />
                  )}
                </button>
              </div>
            </div>
          </div>
            <button
              disabled={loader}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-2xl max-w-sm w-full"
              >
              {loader ? (
                <ButtonLoading />
              ) : (
                "Login"
              )}
            </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
