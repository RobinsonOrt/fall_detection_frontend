import { API } from '../config';

export function Detector() {
  return <div className="border w-full ">
    <div
      className="grow-0  flex justify-center"
      style={{ width: "80%", backgroundColor: "#f0f5f5", margin: "auto", maxHeight: "600px" }}
    >
      <img
          src={`${API}/predict`}
          className="w-full"
          alt="Ha ocurrido un error al cargar la visualización del sistema, por favor intente nuevamente."
        />
    </div>
  </div>
}
