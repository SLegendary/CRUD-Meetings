import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api";
const CreateMeeting = () => {
  const [room, setRoom] = useState("");
  const [stime, setStime] = useState("");
  const [etime, setEtime] = useState("");

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    //Calculate Diference Between Hours
    const msInHour = 1000 * 60;
    let auxE = new Date(etime);
    let auxS = new Date(stime);
    let diff = Math.round(Math.abs(auxE - auxS) / msInHour);
    console.log(diff);

    //Save IF
    if (auxS > auxE) {
      mayor();
    } else if (diff >= 121) {
      maxTime();
    } else {
      await axios.post(endpoint + "/meeting", {
        room: room,
        stime: stime,
        etime: etime,
      });
      navigate("/");
    }
  };

  //Alerts
  function maxTime() {
    alert("El tiempo maximo para una reunion es de 2 horas.");
  }
  function mayor() {
    alert("La hora final no puede ser antes que la inicial.");
  }

  return (
    <div className="container col-6">
      <form onSubmit={store}>
        <div className="mb-3">
          <label className="form-label">Sala</label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora inicial</label>
          <input
            value={stime}
            onChange={(e) => setStime(e.target.value)}
            className="form-control"
            placeholder="Select time"
            type="datetime-local"
            step="900"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora final</label>
          <input
            value={etime}
            onChange={(e) => setEtime(e.target.value)}
            className="form-control"
            placeholder="Select time"
            type="datetime-local"
            step="900"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Confirmar apartado
        </button>
      </form>
    </div>
  );
};

export default CreateMeeting;
