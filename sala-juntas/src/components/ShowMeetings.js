import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const endpoint = "http://localhost:8000/api";
const ShowMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    getAllMeetings();
  }, []);

  const getAllMeetings = async () => {
    const response = await axios.get(`${endpoint}/meetings`);
    setMeetings(response.data);
  };

  const deleteMeeting = async (id) => {
    await axios.delete(`${endpoint}/meeting/${id}`);
    getAllMeetings();
  };

  const updateMeeting = async (id) => {
    await axios.put(`${endpoint}/meeting/${id}`);
    getAllMeetings();
  };

  /*const freeRoom = async () => {
    await axios.put(`${endpoint}/meetings`);
    getAllMeetings();
  };*/

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/create">
            <button type="button" class="btn btn-primary w-100 m-1">
              Reservar sala
            </button>
          </Link>
        </div>
        <div className="col">
          <Link to="/">
            <button type="button" class="btn btn-warning w-100 m-1">
              Update all
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
                  <td> {meeting.stime.slice(-9, -3)} </td>
                  <td> {meeting.etime.slice(-9, -3)} </td>
                  <td> {meeting.available ? "Si" : "No"} </td>
                  <td>
                    <button
                      onClick={() => updateMeeting(meeting.id)}
                      className="btn btn-warning"
                    >
                      Terminar
                    </button>
                    <button
                      onClick={() => deleteMeeting(meeting.id)}
                      className="btn btn-danger"
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
