import { useRef } from "react";
import "assets/css/modal-confirm.css";

const ModalConfirm = ({ setIsOpenCam, setIsOpenFile }) => {
  const closeModal = useRef(null);

  const handleClose = (param = "camera") => {
    closeModal?.current?.click();

    if (param === "camera") return setIsOpenCam();
    setIsOpenFile();
  };

  return (
    <div className="modal-container" id="modal-opened">
      <div className="modal">
        <div className="modal__details">
          <h1 className="modal__title">Weather Prediction</h1>
          <p className="modal__description">
            Metode apa yang akan anda gunakan ?
          </p>
        </div>

        <button className="modal__btn" onClick={() => handleClose("file")}>
          Upload Gambar &rarr;
        </button>
        <button className="modal__btn" onClick={() => handleClose("camera")}>
          Kamera &rarr;
        </button>

        <a ref={closeModal} href="#modal-closed" className="link-2">
          <i aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default ModalConfirm;
