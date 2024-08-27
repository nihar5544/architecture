"use client";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { DM_Serif_Display } from "next/font/google";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

function Page() {
  // State hooks for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <h2
          className="text-3xl font-bold text-center"
          style={{ fontFamily: `${jost.style.fontFamily}` }}
        >
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-10">
          <div className="rounded-md shadow-sm">
            <TextField
              id="email"
              placeholder="Enter Email"
              variant="outlined"
              fullWidth
              required
              className="mb-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
            <TextField
              id="password"
              type="password"
              placeholder="Enter Password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="w-full py-3"
              variant="outlined"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
