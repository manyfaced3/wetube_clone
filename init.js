import app from "./app";

const PORT = 4000;

const handleListening = () => console.log(`listening on init ${PORT}`);

app.listen(PORT,handleListening);