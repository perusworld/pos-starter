import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactHashRouter } from "@ionic/react-router";
import { cafeOutline, listOutline, pieChartOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import OrdersTab from "./pages/OrdersTab";
import MenuTab from "./pages/MenuTab";
import SalesTab from "./pages/SalesTab";
import NewOrderPage from "./pages/NewOrderPage";
import SelectItemPage from "./pages/SelectItem";
import PaymentPage from "./pages/PaymentPage";

interface ContainerProps {}

const Routes: React.FC<ContainerProps> = () => {
  return (
    <IonReactHashRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/orders">
            <OrdersTab />
          </Route>
          <Route exact path="/menu">
            <MenuTab />
          </Route>
          <Route exact path="/sales">
            <SalesTab />
          </Route>
          <Route exact path="/new-order">
            <NewOrderPage />
          </Route>
          <Route exact path="/select-item">
            <SelectItemPage />
          </Route>
          <Route exact path="/pay-order">
            <PaymentPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/orders" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="orders" href="/orders">
            <IonIcon icon={cafeOutline} />
            <IonLabel>Orders</IonLabel>
          </IonTabButton>
          <IonTabButton tab="menu" href="/menu">
            <IonIcon icon={listOutline} />
            <IonLabel>Menu</IonLabel>
          </IonTabButton>
          <IonTabButton tab="sales" href="/sales">
            <IonIcon icon={pieChartOutline} />
            <IonLabel>Sales</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactHashRouter>
  );
};

export default Routes;
