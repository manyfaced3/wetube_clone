import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videosList = await Video.find({});
    res.render("home", { pageTitle: "Home", videosList });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videosList });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingWord }
  } = req;
  res.render("search", { pageTitle: "Search", searchingWord });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  res.redirect(routes.videoDetails(newVideo.id));
};

export const videoDetails = (req, res) =>
  res.render("videoDetails", { pageTitle: "Video Details" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
