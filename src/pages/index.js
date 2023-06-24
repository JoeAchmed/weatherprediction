import { lazy, Suspense } from "react";
import "assets/css/App.css";

import {
  Route,
  Routes,
} from "react-router-dom";
import { LoadingBar } from "components/LoadingBar";


const App = () => {
  const Home = lazy(() => import("./home"));
  const FallbackScreen = <LoadingBar />;

  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={
          <Suspense fallback={FallbackScreen}>
            <Home />
          </Suspense>
        } />
      </Routes>
    </div>
  );
};

export default App;

