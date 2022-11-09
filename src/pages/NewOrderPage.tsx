import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { addCircle, cardOutline, trashOutline } from "ionicons/icons";
import { useEffect } from "react";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import {
  clearCart,
  initCart,
  selectCartCount,
  selectCartId,
} from "../services/cartSlice";
import { useAppDispatch, useAppSelector } from "../services/Hooks";
import "./NewOrderPage.css";

const rightNav = () => (
  <>
    <IonButton routerLink="/pay-order">
      <IonIcon slot="icon-only" icon={cardOutline}></IonIcon>
    </IonButton>
  </>
);

const NewOrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
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
        title={`New Order - ${cartId}`}
        back={true}
        right={rightNav()}
      ></Header>
      <IonContent fullscreen>
        <IonButton
          fill="solid"
          color={"primary"}
          expand={"block"}
          routerLink="/select-item"
        >
          <IonIcon slot="start" icon={addCircle}></IonIcon>
          Add new item
        </IonButton>
        <OrderList></OrderList>
        {0 < cartCount ? (
          <>
            <IonButton
              fill="solid"
              color={"primary"}
              expand={"block"}
              routerLink="/pay-order"
            >
              <IonIcon slot="start" icon={cardOutline}></IonIcon>
              Payment
            </IonButton>
            <IonButton
              fill="solid"
              color={"danger"}
              expand={"block"}
              onClick={() => onClearCart()}
            >
              <IonIcon slot="start" icon={trashOutline}></IonIcon>
              Clear Cart
            </IonButton>
          </>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewOrderPage;
