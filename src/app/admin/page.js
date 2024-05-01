"use client";
import axios from "axios";
import { useState } from "react";

const page = () => {
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
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
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation here
    // For example, check if required fields are filled
    // If validation passes, you can submit the form data
    const formData = new FormData();
    formData.append("Client", client);
    formData.append("Category", category);
    formData.append("Location", location);
    formData.append("Date", date);
    formData.append("Link", link);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageBase64);
    formData.append("otherImage", otherImagesBase64);

    const body = {
      Client: client,
      Category: category,
      location: location,
      Date: date,
      Link: link,
      title: title,
      description: description,
      image: imageBase64,
      otherImage: otherImagesBase64,
    };
    console.log(image, imageBase64, otherImages, otherImagesBase64);
    axios
      .post("http://localhost:3000/api/projectDetails", body)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="client" className="block mb-1">
          Client
        </label>
        <input
          required
          type="text"
          id="client"
          onChange={(e) => setClient(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Category" className="block mb-1">
          Category
        </label>
        <input
          required
          type="text"
          id="Category"
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block mb-1">
          location
        </label>
        <input
          required
          type="text"
          id="location"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Date" className="block mb-1">
          Date
        </label>
        <input
          required
          type="text"
          id="Date"
          onChange={(e) => setDate(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Link" className="block mb-1">
          Link
        </label>
        <input
          required
          type="text"
          id="Link"
          onChange={(e) => setLink(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1">
          title
        </label>
        <input
          required
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">
          description
        </label>
        <input
          required
          type="text"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-gray-300 border p-2 rounded"
        />
      </div>
      {/* Repeat similar structure for other fields */}
      {/* Drag and Drop for Single Image */}
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div
          className="h-32 w-full border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("image").click()}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
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
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Remove Image
          </button>
        )}
      </div>
      {/* Drag and Drop for Multiple Images */}
      <div className="mb-4">
        <label htmlFor="otherImages" className="block mb-1">
          Other Images
        </label>
        <input
          type="file"
          id="otherImages"
          accept="image/*"
          multiple
          onChange={handleOtherImagesChange}
          className="hidden"
        />
        <div className="grid grid-cols-3 gap-4">
          {otherImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-32 w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveOtherImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 focus:outline-none"
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
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default page;
