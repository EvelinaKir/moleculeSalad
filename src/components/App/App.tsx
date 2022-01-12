import style from "./app.module.scss";
import { Route, Routes } from "react-router-dom";
import { Main, LayOut, Kitchen, SaladDetail, Welcome } from "..";

function App() {
  return (
    <div className={style.container}>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="/main/:id" element={<SaladDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
