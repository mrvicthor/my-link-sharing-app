import { Player } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  return (
    <div className="flex justify-center mt-4">
      <Player
        autoplay
        loop
        src="https://lottie.host/767225c0-e475-48db-8b55-742a11287541/GmhdZpg40Y.json"
        style={{ height: "450px", width: "350px" }}
      ></Player>
    </div>
  );
};

export default Loader;
