import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import { useRef, useState } from "react";
import { useLocationList, useWeather } from "hooks";
import { LoadingBar } from "components/LoadingBar";
import BottomBar from "components/BottomBar";
import ModalConfirm from "components/ModalConfirm";

// image result
import shinyImg from "assets/img/shiny.png";
import cloudyImg from "assets/img/Moon cloud fast wind.png";
import rainyImg from "assets/img/rainy.png";
import sunriseImg from "assets/img/sunrise.png";

import "react-html5-camera-photo/build/css/index.css";
import "assets/css/home.css";
import "assets/css/weather.css";

const STALE_TIME = 600000;
const CACHE_TIME = 3600000;
const OPTIONS_CONFIG = { staleTime: STALE_TIME, cacheTime: CACHE_TIME };

const Home = () => {
  const locations = useLocationList(OPTIONS_CONFIG);
  const weather = useWeather();
  const [isOpen, setIsOpen] = useState("home"); /* enum: home, camera, result */
  const [summary, setSummary] = useState({ result: "", accuracy: "" });
  const isOpenFile = useRef(null);

  const weatherResults = {
    Shine: shinyImg,
    Cloudy: cloudyImg,
    Rainy: rainyImg,
    Sunrise: sunriseImg,
  };

  const postPredictWeather = (payload) => {
    weather.mutate(payload, {
      onSuccess: (res) => {
        console.log(res);
        setSummary({ result: res?.result, accuracy: res?.accuracy ? Math.round(res?.accuracy) : 0 });
        setIsOpen("result");
      },
      onError: (err) => console.log(err),
    });
  };

  const handleUploadImg = (e) => {
    const file = e.target.files;
    var formData = new FormData();
    formData.append("files", file[0], "photo.jpg");

    postPredictWeather(formData);
  };

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    const byteString = atob(dataUri.split(",")[1]); // Menghapus bagian header dari data URI
    const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0]; // Mendapatkan tipe mime dari data URI
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Membuat objek File dari data URI
    const file = new File([ab], "photo.jpg", { type: mimeString });

    // Kirim file ke server atau lakukan operasi lain yang diperlukan
    var formData = new FormData();
    formData.append("files", file, "photo.jpg");

    postPredictWeather(formData);
  }

  const handleCancelCamera = () => {
    setIsOpen("home");
  };

  const displayContent = {
    home: (
      <p className="desc">
        Prediksi cuaca hari ini dengan menekan tombol option camera/upload. Atau
        dengan menekan tombol plus pada bottom bar
      </p>
    ),
    result: (
      <div className="card-container">
        <div className="card-weather-lg">
          <div className="wrapper">
            <div className="link-2" onClick={() => window.location.reload()}></div>
            <span className="city">
              {locations?.isLoading
                ? "Loading ..."
                : `${locations?.data?.city?.name}, ${locations?.data?.country?.name}`}
            </span>
            <span className="result">{summary.result}</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h5 className="accurate">{summary.accuracy}%</h5>
              <span className="city">akurasi</span>
            </div>
          </div>
          <img src={weatherResults[summary.result]} alt="weather img" width={160} height={160} />
        </div>
      </div>
    ),
    camera: (
      <div className="fixed-camera">
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isFullscreen
        />
        <button className="modal__btn" onClick={handleCancelCamera}>
          Cancel &times;
        </button>
      </div>
    ),
  };

  return (
    <div className="HomeWrapper">
      <h1 className="modal__title title-app">WeatherApp</h1>
      <span className="subtitle-app">Predict the weather accurately</span>
      <div className="weather">
        <div className="main-container">
          {weather.isLoading ? <LoadingBar /> : displayContent[isOpen]}
        </div>
        <input
          ref={isOpenFile}
          className="hidden"
          accept=".jpeg, .png, .jpg"
          type="file"
          id="upload"
          onChange={handleUploadImg}
        />
        <ModalConfirm setIsOpenCam={() => setIsOpen("camera")} setIsOpenFile={() => isOpenFile?.current?.click()} />
      </div>
      <div className="Home-container">
        <BottomBar
          setIsOpenCam={() => setIsOpen("camera")}
          setIsOpenFile={() => isOpenFile?.current?.click()}
        />
      </div>
    </div>
  );
};

export default Home;
