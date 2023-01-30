import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name && form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const data = await response.json();

        if (response.status === 200) {
          setLoading(false);
          navigate("/");
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#212529] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#adb5bd] text-[14px] max-w-[500px]'>
          Ride the Symphony of Neptune's stars, with our AI image creation
        </p>
      </div>

      <div className="flex justify-center items-center">
          <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
              <FormField
                LabelName='Your Name'
                type='text'
                name='name'
                value={form.name}
                placeholder='NepTunes'
                handleChange={handleChange}
              />
              <FormField
                LabelName='Prompt'
                type='text'
                name='prompt'
                placeholder='NepTunes a place for you to share your thoughts'
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />
              <div
                className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#52b788]
              focus:border-[#52b788] focus:bg-[#e9f5f0] w-164 p-3 h-164 flex justify-center items-center'
              >
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className='w-full h-full object-contain rounded-lg'
                  />
                ) : (
                  <img
                    src={preview}
                    alt='preview'
                    className='w-9/12 h-9/12 object-contain opacity-40 rounded-lg'
                  />
                )}

                {generatingImg && (
                  <div className='absolute inset-0 z-0 flex justify-center items-center bg-[#e9f5f0] bg-opacity-50 rounded-lg'>
                    <Loader />
                  </div>
                )}
              </div>
            </div>
            <div className='mt-5 flex gap-5'>
              <button
                type='button'
                onClick={generateImage}
                className='bg-[#52b788] text-white text-sm font-semibold py-2 px-4 rounded-lg'
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
            </div>
            <div className='mt-10'>
              <p className='text-[#adb5bd] text-sm'>
                You can share your thoughts with the world, our community will push
                your thoughts to Neptune
              </p>
              <button
                type='submit'
                className='mt-5 bg-[#6247aa] text-white text-sm font-semibold py-2 px-4 rounded-lg'
              >
                {loading ? "Sharing..." : "Share with Neptune"}
              </button>
            </div>
          </form>
        </div>
    </section>
  );
};

export default CreatePost;
