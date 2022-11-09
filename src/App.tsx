import {
  IonApp,
  setupIonicReact,
} from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { Provider } from "react-redux";
import { store } from "./services/Store";

/* Theme variables */
import "./theme/variables.css";
import { useState } from "react";
import Routes from "./Routes";

setupIonicReact();

const App: React.FC = () => {
  const [theme] = useState<string>("bright");

  return (
    <Provider store={store}>
      <IonApp class={theme}>
        <Routes></Routes>
      </IonApp>
    </Provider>
  );
};

export default App;
