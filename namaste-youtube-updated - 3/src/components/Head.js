import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/applicationSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { GOOGLE_API_KEY } from "../utils/constants";
import { addVideos } from "../utils/applicationSlice";

const Head = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1], // [searchQuery] => dynamic Key
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchdata = async () => {
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=subwaysurrfergame&key=AIzaSyBUnBjqsXjuzT2lUj4QmqIUUatlzpopcAA"
    );
    const json = await data.json();
    dispatch(addVideos(json.items));
  };

  return (
    <div className="grid grid-flow-col p-1 m-2 shadow-lg bg-green-50">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-12 cursor-pointer"
          src="https://static.vecteezy.com/system/resources/thumbnails/021/190/402/small/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
          alt="img"
        />

        <img
          className="h-12 m-2 mt-0"
          src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg"
          alt="img"
        />
      </div>
      <div className="col-span-10 mt-1">
        <div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            placeholder="Search"
            type="text"
            name=""
            id=""
            onFocus={() => {
              setShowSuggestions(true);
            }}
          />
          <button
            onClick={() => {
              getSearchdata();
            }}
            className="border border-gray-400 p-2 rounded-r-full bg-gray-100"
          >
            search
          </button>
        </div>
        {showSuggestions && (
          <>
            <div className="fixed bg-white py-2 px-2 w-[33rem] shadow-lg rounded-lg border border-g">
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery(suggestion);
                    }}
                    className="py-2 hover:bg-gray-100 shadow-sm"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="col-span-1 px-10">
        <img
          className="h-12"
          src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
          alt="img"
        />
      </div>
    </div>
  );
};

export default Head;
