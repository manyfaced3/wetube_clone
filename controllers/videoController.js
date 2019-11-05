import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videosList = await Video.find({}).sort({ _id: -1 }); // 최신비디오가 맨 앞에 오도록 정렬
    res.render("home", { pageTitle: "Home", videosList });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.render("home", { pageTitle: "Home", videosList: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingWord }
  } = req;
  let videosList = [];
  try {
    videosList = await Video.find({
      title: { $regex: searchingWord, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingWord, videosList });
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

export const videoDetails = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetails", { pageTitle: `${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.render(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetails(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
