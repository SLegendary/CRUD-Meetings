import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api"; //API del CRUD creada en laravel
const CreateMeeting = () => {
  const [room, setRoom] = useState("");
  const [stime, setStime] = useState("");
  const [etime, setEtime] = useState("");
  const [times, setTimes] = useState([]);
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    //Calculate Diference Between Hours
    const msInHour = 1000 * 60;
    let auxE = new Date(etime);
    let auxS = new Date(stime);
    let diff = Math.round(Math.abs(auxE - auxS) / msInHour);
    console.log("min:" + diff);

    //Save IF
    if (auxS > auxE) {
      alert("La hora final no puede ser antes que la inicial.");
    } else if (diff >= 121) {
      alert("El tiempo maximo para una reunion es de 2 horas.");
    } else {
      const response = await axios.get(`${endpoint}/meeting/${room}`);
      setTimes(response.data);

      //Ciclo forEach para comprobar que las horas de inicio y termino no intervengan con otra reunion de la misma sala.
      var aux = 0;
      times.forEach(async (times) => {
        let getS = new Date(times.stime);
        let getE = new Date(times.etime);
        if (auxS > getS && auxS < getE) {
          alert("La hora inicial interviene en otra reunion en esta sala."); //Si interviene, muestra mensaje de error
          aux += 1;
        } else if (auxE > getS && auxE < getE) {
          alert("La hora final interviene en otra reunion en esta sala."); //Si interviene, muestra mensaje de error
          aux += 1;
        } else if (auxS === getS && auxE && getE) {
          alert("La sala esta ocupada.");
          aux += 1;
        }
      });
      //Si no interviene se reserva la sala.
      if (aux === 0) {
        await axios.post(endpoint + "/meeting", {
          room: room,
          stime: stime,
          etime: etime,
        });
        navigate("/");
        alert("Sala apartada correctamente.");
      }
    }
  };

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
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CreateMeeting;
