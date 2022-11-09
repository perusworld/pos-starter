import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { addCircle, cardOutline, logoBitcoin, trashOutline } from "ionicons/icons";
import { useEffect } from "react";
import Header from "../components/Header";
import OrderCost from "../components/OrderCost";
import {
  clearCart,
  initCart,
  selectCartCount,
  selectCartId,
} from "../services/cartSlice";
import { useAppDispatch, useAppSelector } from "../services/Hooks";
import "./PaymentPage.css";

const rightNav = () => (
  <>
    <IonButton>
      <IonIcon slot="icon-only" icon={cardOutline}></IonIcon>
    </IonButton>
  </>
);

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartId = useAppSelector(selectCartId);
  useEffect(() => {
    dispatch(initCart());
  }, [dispatch]);

  const onClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <IonPage>
      <Header
        title={`Payment Info - ${cartId}`}
        back={true}
        right={rightNav()}
      ></Header>
      <IonContent fullscreen>
        <OrderCost></OrderCost>
        <IonButton
          fill="solid"
          color={"secondary"}
          expand={"block"}
          routerLink="/select-item"
        >
          <IonIcon slot="start" icon={cardOutline}></IonIcon>
          Pay using credit card
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PaymentPage;
