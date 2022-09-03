import './styles/App.css';
import './styles/Answers.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Ask from './pages/Ask';
import Answers from './pages/Answers';
import Respond from './pages/Respond';
import Admin from './pages/Admin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Ask />} />
          <Route path="/Ask" element={<Ask />} />
          <Route path="/Answers" element={<Answers />} />
          <Route path="/Admin" element={<Admin />} />
          {/* <Route path="/RespondGuarded" element={<Respond />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
