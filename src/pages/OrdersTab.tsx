import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import OrdersList from "../components/OrdersList";
import { POSService } from "../services/POSService";
import "./OrdersTab.css";

const rightNav = () => (
  <>
    <IonButton routerLink="/new-order">
      <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
    </IonButton>
  </>
);

const OrdersTab: React.FC = () => {
  
  const [orders, setOrders] = useState({} as any);

  useEffect(() => {
    console.log("load orders");
    const loadData = async () => {
      const orders = await POSService.orders(false);
      setOrders(orders ? orders : {});
    };
    loadData()
      .then(() => {
        console.log("done");
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <IonPage>
      <Header title="Orders" right={rightNav()}></Header>
      <IonContent fullscreen>
        <OrdersList orders={orders?.orders}></OrdersList>
      </IonContent>
    </IonPage>
  );
};

export default OrdersTab;
