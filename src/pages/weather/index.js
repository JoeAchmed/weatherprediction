import weatherImg from "assets/img/Moon cloud mid rain.png";
import "assets/css/weather.css";

const Weather = () => {
  return (
    <div className="weather-container">
      <div className="card-container">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div className="card-weather-lg" key={idx}>
            <div className="wrapper">
              <span>19°</span>
              <span className="city">Jakarta, Indonesia</span>
            </div>
            <img src={weatherImg} alt="weather img" width={160} height={160} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;