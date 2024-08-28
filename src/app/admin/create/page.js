"use client";
import ButtonLoading from "@/components/loader/buttonLoading";
import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AdminCreate = () => {
  const [client, setClient] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [otherImages, setOtherImages] = useState([]);
  const [otherImagesBase64, setOtherImagesBase64] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        let base64String = reader.result;
        // Remove the data URL prefix
        base64String = base64String.replace(
          /^data:image\/(jpeg|jpg);base64,/,
          ""
        );
        setImageBase64(base64String);
        console.log(reader);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOtherImagesChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setOtherImages([...otherImages, ...newImages]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOtherImagesBase64([...otherImagesBase64, reader.result]);
      };
      reader.readAsDataURL(newImages[0]);
    }
  };
  const handleRemoveOtherImage = (indexToRemove) => {
    const newOtherImages = [...otherImages];
    newOtherImages.splice(indexToRemove, 1);
    setOtherImages(newOtherImages);

    const newOtherImagesBase64 = [...otherImagesBase64];
    newOtherImagesBase64.splice(indexToRemove, 1);
    setOtherImagesBase64(newOtherImagesBase64);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    const body = {
      Client: client,
      Category: category,
      Location: location,
      Date: date,
      Link: link,
      title: title,
      description: description,
      image: imageBase64,
      otherImage: otherImagesBase64,
    };
    console.log(image, imageBase64, otherImages, otherImagesBase64);
    axios
      .post("/api/projectDetails", body)
      .then(() => {
        setLoading(false);
        setClient("");
        setCategory("");
        setLocation("");
        setDate("");
        setLink("");
        setTitle("");
        setDescription("");
        setImage(null);
        setImageBase64("");
        setOtherImages([]);
        setOtherImagesBase64([]);
        toast.success("Project details created successfully");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Error creating project details");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto grid grid-cols-2 gap-5"
    >
      <div className="">
        <label htmlFor="client" className="block mb-1">
          Client
        </label>
        <input
          required
          type="text"
          defaultValue={client}
          id="client"
          onChange={(e) => setClient(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded-xl"
        />
      </div>
      <div className="">
        <label htmlFor="Category" className="block mb-1">
          Category
        </label>
        <input
          required
          type="text"
          defaultValue={category}
          id="Category"
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded-xl"
        />
      </div>
      <div className="">
        <label htmlFor="location" className="block mb-1">
          location
        </label>
        <input
          required
          type="text"
          id="location"
          defaultValue={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded-xl"
        />
      </div>
      <div className="">
        <label htmlFor="Date" className="block mb-1">
          Date
        </label>
        <input
          required
          type="text"
          id="Date"
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded-xl"
        />
      </div>
      <div className="">
        <label htmlFor="Link" className="block mb-1">
          Link
        </label>
        <input
          required
          type="text"
          defaultValue={link}
          id="Link"
          onChange={(e) => setLink(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded-xl"
        />
      </div>
      <div className="">
        <label htmlFor="title" className="block mb-1">
          title
        </label>
        <input
          required
          type="text"
          defaultValue={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded-xl"
        />
      </div>
      <div className="">
        <label htmlFor="description" className="block mb-1">
          description
        </label>
        <TextareaAutosize
          required
          type="text"
          minRows={5}
          maxRows={5}
          defaultValue={description}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded-xl"
        />
      </div>
      {/* Repeat similar structure for other fields */}
      {/* Drag and Drop for Single Image */}
      <div className=" ">
        <label htmlFor="image" className="block mb-1">
          Image
        </label>
        <input
          required
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div
          className="h-48 w-full border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("image").click()}
        >
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="Preview"
              width={0}
              height={0}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>Drag &amp; Drop Image</span>
          )}
        </div>
        {image && (
          <button
            type="button"
            onClick={() => setImage(null)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Remove Image
          </button>
        )}
      </div>
      {/* Drag and Drop for Multiple Images */}
      <div className=" col-span-2">
        <label htmlFor="otherImages" className="block mb-1">
          Other Images
        </label>
        <input
          required
          type="file"
          id="otherImages"
          accept="image/*"
          multiple
          onChange={handleOtherImagesChange}
          className="hidden"
        />
        <div className="grid grid-cols-4 gap-4">
          {otherImages.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-32 w-full object-cover rounded-lg"
                width={0}
                height={0}
              />
              <button
                type="button"
                onClick={() => handleRemoveOtherImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1  px-3 focus:outline-none"
              >
                X
              </button>
            </div>
          ))}
          <div
            className="h-32 w-full border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("otherImages").click()}
          >
            <span>+</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-center gap-2 max-sm:flex-col-reverse">
        <button
          onClick={() => router.push("/admin")}
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-2xl max-w-sm w-full"
        >
          Back
        </button>
        {loading ? (
          <ButtonLoading />
        ) : (
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-2xl max-w-sm w-full"
          >
            Upload Property
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
};

export default AdminCreate;
