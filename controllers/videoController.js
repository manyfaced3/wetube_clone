import {videosList} from "../db";

export const home = (req, res) =>{
  res.render("home", { pageTitle: "Home", videosList });
};
  
export const search = (req, res) => {
  const {
    query: { term: searchingWord }
  } = req;
  res.render("search", { pageTitle: "Search", searchingWord });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const videoDetails = (req, res) =>
  res.render("videoDetails", { pageTitle: "Video Details" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
