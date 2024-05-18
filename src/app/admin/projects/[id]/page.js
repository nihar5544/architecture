"use client";
import ButtonLoading from "@/components/loader/buttonLoading";
import BuildingLoading from "@/components/loader/pageLoader";
import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminCreate = () => {
  const [data, setData] = useState({});
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
  const [dataloading, setDataLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setDataLoading(true);
    axios
      .get(`/api/projectDetails/${params?.id}`)
      .then((res) => {
        const projectData = res.data?.data;
        setData(projectData);
        setClient(projectData?.Client || "");
        setCategory(projectData?.Category || "");
        setLocation(projectData?.Location || "");
        setDate(projectData?.Date || "");
        setLink(projectData?.Link || "");
        setTitle(projectData?.title || "");
        setDescription(projectData?.description || "");
        setImageBase64(projectData?.image || "");
        setOtherImagesBase64(projectData?.otherImage || []);
        setDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDataLoading(false);
      });
  }, [params.id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        let base64String = reader.result;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleOtherImagesChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setOtherImages([...otherImages, ...newImages]);

      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setOtherImagesBase64((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveOtherImage = (indexToRemove) => {
    setOtherImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setOtherImagesBase64((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
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

    axios
      .put(`/api/projectDetails/${params?.id}`, body)
      .then(() => {
        setLoading(false);
        toast.success("Project details updated successfully");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Error updating project details");
      });
  };

  return (
    <>
      {dataloading ? (
        <BuildingLoading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto grid grid-cols-2 gap-5"
        >
          <div>
            <label htmlFor="client" className="block mb-1">
              Client
            </label>
            <input
              required
              type="text"
              value={client}
              id="client"
              onChange={(e) => setClient(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="Category" className="block mb-1">
              Category
            </label>
            <input
              required
              type="text"
              value={category}
              id="Category"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="location" className="block mb-1">
              Location
            </label>
            <input
              required
              type="text"
              value={location}
              id="location"
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="Date" className="block mb-1">
              Date
            </label>
            <input
              required
              type="text"
              value={date}
              id="Date"
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="Link" className="block mb-1">
              Link
            </label>
            <input
              required
              type="text"
              value={link}
              id="Link"
              onChange={(e) => setLink(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              required
              type="text"
              value={title}
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <TextareaAutosize
              required
              minRows={5}
              maxRows={5}
              value={description}
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 border p-2 rounded-xl"
            />
          </div>
          <div>
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
  className="h-48 w-full border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
  onClick={() => document.getElementById("image").click()}
>
  {imageBase64 ? (
    <Image
      src={imageBase64}
      alt="Preview"
      width={0}
      height={0}
      className="h-full w-full object-cover"
    />
  ) : (
    <span>Drag & Drop Image</span>
  )}
</div>

            {imageBase64 && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Remove Image
              </button>
            )}
          </div>
          <div className="col-span-2">
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
            <div className="grid grid-cols-4 gap-4">
              {otherImagesBase64.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
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
          <div className="col-span-2 flex justify-center">
            {loading ? (
              <ButtonLoading />
            ) : (
              <button
                disabled={loading}
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-2xl max-w-sm w-full"
              >
                Update Project
              </button>
            )}
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      )}
    </>
  );
};

export default AdminCreate;
