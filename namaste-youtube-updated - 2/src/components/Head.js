import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/applicationSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search); // store.search will have {} initially.This is the initial state.
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        // object[key] → Here, "object" is searchCache and "key" is searchQuery.
        // Example: searchCache[searchQuery]
        //
        // Logic:
        // - If the searchQuery already exists in the cache (Redux store),
        //   return the cached suggestions (✅ no API call needed).
        setSuggestions(searchCache[searchQuery]);
      } else {
        // - If the searchQuery is NOT in the cache,
        //   then make an API call and store the result in the cache for future use.
        getSearchSuggestion();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // cacheResults - To prevent repeatative Api call for the same search we cache the result in redux store

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

  // {
  //   [searchQuery]: json[1],
  // }

  // This is the action payLoad.

  // Sample Example -

  // searchCache =  {
  //   "iphone": ["iphone 11","iphone 14"],
  // }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
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
            onBlur={() => {
              setShowSuggestions(false);
            }}
          />
          <button className="border border-gray-400 p-2 rounded-r-full bg-gray-100">
            search
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[33rem] shadow-lg rounded-lg border border-g">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 hover:bg-gray-100 shadow-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
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
