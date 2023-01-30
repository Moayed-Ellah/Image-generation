import React, { useState, useEffect } from "react";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className='mt-5 font-bold text-[#52b788] text-xl uppercase'>{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllposts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllposts(result.data.reverse());
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [searchText]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#212529] text-[32px]'>Showcase</h1>
        <p className='mt-2 text-[#adb5bd] text-[14px] max-w-[500px]'>
          Unlock the mysteries of Symphony, and let Neptune be your guide to the
          extraterrestrial unknown
        </p>
      </div>
      <div className='mt-16'>
        <FormField
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search something...'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <div className='flex justify-between items-center'>
                <h2 className='font-medium text-[#adb5bd] text-[20px]'>
                  Search Results for{" "}
                  <span className='text-[#6c757d]'>{searchText}</span>
                </h2>
              </div>
            )}
            <div className='mt-10 grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No Search Results Found'
                />
              ) : (
                <RenderCards data={allPosts} title='No Posts Found' />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
