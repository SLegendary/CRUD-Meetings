import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const endpoint = "http://localhost:8000/api"; //API del CRUD creada en laravel
const ShowMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getAllMeetings();
    autoUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Obtener datos para tabla
  const getAllMeetings = async () => {
    const response = await axios.get(`${endpoint}/meetings`);
    setMeetings(response.data);
  };

  //Eliminar registro
  const deleteMeeting = async (id) => {
    await axios.delete(`${endpoint}/meeting/${id}`);
    getAllMeetings();
  };

  //Actualizar el estado de "Disponible"
  const updateMeeting = async (id) => {
    await axios.put(`${endpoint}/meeting/${id}`);
    getAllMeetings();
  };

  //Actualizar estado de "Disponible" si la hora de termino de reunion ya termino.
  const autoUpdate = () => {
    meetings.forEach(async (meetings) => {
      let end = new Date(meetings.etime);
      let current = new Date();
      if (current > end) {
        console.log("me pase");
        updateMeeting(meetings.id);
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/create">
            <button type="button" className="btn btn-primary w-100 m-1">
              Reservar sala
            </button>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table table-dark table-striped m-1">
            <thead className="bg-primary text-white">
              <tr>
                <th>Numero de Sala</th>
                <th>Fecha</th>
                <th>Hora inical</th>
                <th>Hora final</th>
                <th>Disponible</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id}>
                  <td> {meeting.room} </td>
                  <td>
                    {" "}
                    {meeting.stime.slice(8, 10)}
                    {"/"}
                    {meeting.stime.slice(5, 7)}
                    {"/"}
                    {meeting.stime.slice(0, 4)}{" "}
                  </td>
                  <td> {meeting.stime.slice(-9, -3)} </td>
                  <td> {meeting.etime.slice(-9, -3)} </td>
                  <td> {meeting.available ? "Si" : "No"} </td>
                  <td>
                    <button
                      onClick={() => updateMeeting(meeting.id)}
                      className="btn btn-warning  m-1"
                    >
                      Terminar
                    </button>
                    <button
                      onClick={() => deleteMeeting(meeting.id)}
                      className="btn btn-danger  m-1"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowMeetings;
