import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importar nuestros componentes
import ShowMeetings from "./components/ShowMeetings";
import CreateMeeting from "./components/CreateMeeting";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowMeetings />} />
          <Route path="/create" element={<CreateMeeting />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
