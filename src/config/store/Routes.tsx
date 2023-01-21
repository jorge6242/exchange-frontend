import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from '../../components/Home/Home';

export default function Routing() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
