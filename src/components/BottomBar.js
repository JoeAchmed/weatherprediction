import "assets/css/bottom-bar.css";

const BottomBar = ({ setIsOpenCam, setIsOpenFile }) => (
  <div className="bottom-bar-container">
    <div>
      <div className="weather-card-container">
        <div className="weather-card" onClick={() => setIsOpenCam()}>Camera</div>
        <div className="weather-card" onClick={() => setIsOpenFile()}>Upload</div>
      </div>
    </div>
    <div className="button-group">
      <div className="btn-options"></div>
        <a href="#modal-opened" className="link-1 btn-predict" id="modal-closed">
        </a>
      <div className="btn-options"></div>
    </div>
  </div>
);

export default BottomBar;
