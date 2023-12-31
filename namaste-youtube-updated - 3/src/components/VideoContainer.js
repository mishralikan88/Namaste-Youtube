import React, { useEffect } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../utils/applicationSlice";

const VideoContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getVideos();
  }, []);

  const serachedVideoList = useSelector((store) => store.app.videos);
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    dispatch(addVideos(json.items));
  };

  return serachedVideoList.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div className="flex flex-wrap">
      {serachedVideoList.map((video) => (
        <>
          {console.log("video >>>>", video.id.videoId === undefined)}
          <Link
            to={
              "/watch?v=" +
              (video.id.videoId === undefined ? video.id : video.id.videoId)
            }
          >
            <VideoCard key={video.id} info={video} />
          </Link>
        </>
      ))}
    </div>
  );
};

export default VideoContainer;
