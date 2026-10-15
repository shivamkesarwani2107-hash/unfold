
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./frontend/header";
import Home from "./frontend/home";
import Footer from "./frontend/footer";
import Help from "./frontend/help";
import Create from "./frontend/create";
import AIWishes from "./frontend/ai-wishes";
import Payment from "./frontend/payment";

import Birthday from "./frontend/birthday";
import Love from "./frontend/love";
import Anniversary from "./frontend/anniversary";
import Friend from "./frontend/friend";
import Festivals from "./frontend/festivals";
import Ordinary from "./frontend/ordinary";

import Wedding from "./frontend/wedding";
import Achievement from "./frontend/achievement";
import LongDistance from "./frontend/longdistance";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/create" element={<Create />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ai-wishes" element={<AIWishes />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/love" element={<Love />} />
        <Route path="/anniversary" element={<Anniversary />} />
        <Route path="/friends" element={<Friend />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/just-because" element={<Ordinary />} />

        <Route path="/wedding" element={<Wedding />} />
        <Route path="/achievements" element={<Achievement />} />
        <Route path="/long-distance" element={<LongDistance />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
