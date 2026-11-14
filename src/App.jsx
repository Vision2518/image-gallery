import React, { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify/unstyled";
const API_KEY = "DeKO6mby83efFLV1RNT6bDuh5pphHDmkLpVaQF5q0lc";
const App = () => {
  const [photos,setPhotos]=useState([])
  const [loading,setLoading]=useState(false)
  const [page,setPage]=useState(1)
  const [query,setQuery]=useState("nature")
  const fetchImage = async () => {
    try {
      setLoading(true)
      const options={
        headers:{
          Authorization:`Client-ID ${API_KEY}`
        }
      }
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12`,options
      );
      console.log(res.data);
      setPhotos([...photos,...res.data.results])
    } catch (error) {
      toast.error("Failed to fetch images");
    }
    finally{
      setLoading(false)
    }
  };
  const loadMore=()=>{
   setPage(page+1)
  }
  const search=(e)=>{
  e.preventDefault();
  const q=e.target[0].value.trim()
  setPhotos([])
  setQuery(q)
  }
  useEffect(() => {
    fetchImage();
  }, [page,query]);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-12">
      <h1 className="text-4xl font-bold text-indigo-600">📸Image Gallery</h1>
      <form onSubmit={search}>
        <input
          className=" bg-white w-[400px] focus:outline-indigo-500"
          placeholder="search image here"
        />
        <button className="bg-indigo-600">Search</button>
      </form>
      <div>
        <div className="grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12">
          {
            photos.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl bg-white"
              >
                <img 
                src={item.urls.regular}
                alt={item.alt_description}
                className="rounded-t-lg h-[180px] object-cover w-full hover:scale-110 transition-transform duration-300"
                />
                <div className="p-3">
                  <a  href={item.urls.full} target="_blank"className="mt-3 block bg-green-400 font-bold py-2 rounded-lg text-center hover:scale-105 transition-transform duration-300">
                   <i className="ri-download-line"></i>
                    Download
                  </a>
                  </div>
              </div>
            ))}
        </div>
      </div>
      {
        loading&&
      <i className="ri-loader-line text-4xl text-gray-400 animate-spin"></i>
      }
      <button onClick={loadMore} className="bg-rose-500 font-medium rounded-lg py-3 px-10 hover:scale-105 transition-transform duration-300 text-white">Load More...</button>
      <ToastContainer />
    </div>
  );
};
export default App; 
