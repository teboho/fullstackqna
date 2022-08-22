import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Ask from './pages/Ask';
import Answers from './pages/Answers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Ask />} />
          <Route path="/Ask" element={<Ask />} />
          <Route path="/Answers" element={<Answers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
