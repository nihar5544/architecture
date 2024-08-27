"use client";
import PageHeader from "@/components/navigationbar/PageHeader";
import React, { useState } from "react";
import { DM_Serif_Display } from "next/font/google";
import Icons from "@/components/icons";
import { TextField } from "@mui/material";
import ButtonDark from "@/components/button/ButtonDark";
import axios from "axios";
import { toast } from "sonner";

const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

function Page() {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState(
    "Hello, I am interested in..."
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // handleSubmit function with validation
  const handleSubmit = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!subject) newErrors.subject = "Subject is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const formData = { name, email, subject, phone, description };

    axios
      .post("/api/contect", formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending message");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center one fadeIn animate">
      <PageHeader name="Contact Us" />
      <div className="lg:w-[70%] flex flex-col items-center justify-center">
        <span
          className="text-5xl mb-2 mt-24 text-center"
          style={{ fontFamily: `${jost.style.fontFamily}` }}
        >
          We love meeting new people <br /> and helping them.
        </span>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-10 my-20 max-sm:p-3">
          <div className="bg-[#F4F0EC] w-full rounded-3xl flex flex-col justify-between items-center p-6">
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-mail"} />
              <span>info@yourdomain.com</span>
            </div>
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-phone"} />
              <span>+91 98257 39499</span>
            </div>
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-web"} />
              <span>www.yourdomain.com</span>
            </div>
          </div>
          <div className="col-span-2 max-sm:col-span-1">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5 mb-6">
              <TextField
                id="name"
                label="Name"
                variant="standard"
                value={name}
                required
                error={!!errors.name}
                helperText={errors.name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                value={email}
                required
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5 mb-6">
              <TextField
                id="subject"
                label="Subject"
                required
                variant="standard"
                value={subject}
                error={!!errors.subject}
                helperText={errors.subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                id="phone"
                label="Phone"
                required
                variant="standard"
                value={phone}
                error={!!errors.phone}
                helperText={errors.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="w-full grid grid-cols-1 mb-6">
              <TextField
                id="description"
                label="Description"
                required
                multiline
                rows={4}
                value={description}
                error={!!errors.description}
                helperText={errors.description}
                onChange={(e) => setDescription(e.target.value)}
                variant="standard"
              />
            </div>
            <div className="w-full flex justify-end max-sm:justify-center">
              <ButtonDark name="Send Now" handlesubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
