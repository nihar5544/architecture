"use client";
import PageHeader from "@/components/navigationbar/PageHeader";
import React, { useEffect, useState } from "react";
import { DM_Serif_Display } from "next/font/google";
import Icons from "@/components/icons";
import { TextField } from "@mui/material";
import ButtonDark from "@/components/button/ButtonDark";
import axios from "axios";
import { toast } from "sonner";

const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

const DEFAULT_CMS = {
  title: "We love meeting new people\nand helping them.",
  email: "info@yourdomain.com",
  phone: "+91 98257 39499",
  website: "www.yourdomain.com",
};

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("Hello, I am interested in...");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [cms, setCms] = useState(DEFAULT_CMS);

  useEffect(() => {
    axios
      .get("/api/cms/contact")
      .then((res) => {
        if (res.data?.data) setCms({ ...DEFAULT_CMS, ...res.data.data });
      })
      .catch(() => {});
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!subject) newErrors.subject = "Subject is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    axios
      .post("/api/contect", { name, email, subject, phone, description })
      .then(() => {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setDescription("");
      })
      .catch(() => toast.error("Error sending message"))
      .finally(() => setLoading(false));
  };

  const titleLines = (cms.title || DEFAULT_CMS.title).split("\n");

  return (
    <div className="flex flex-col items-center justify-center one fadeIn animate">
      <PageHeader name="Contact Us" />
      <div className="lg:w-[70%] flex flex-col items-center justify-center">
        <span
          className="text-5xl mb-2 mt-24 text-center"
          style={{ fontFamily: `${jost.style.fontFamily}` }}
        >
          {titleLines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-10 my-20 max-sm:p-3">
          <div className="bg-[#F4F0EC] w-full rounded-3xl flex flex-col justify-between items-center p-6">
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-mail"} />
              <span>{cms.email}</span>
            </div>
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-phone"} />
              <span>{cms.phone}</span>
            </div>
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-web"} />
              <span>{cms.website}</span>
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
