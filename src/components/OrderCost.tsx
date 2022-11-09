import { IonBadge, IonIcon, IonItem, IonLabel } from "@ionic/react";
import {
  fastFoodOutline,
  listCircleOutline,
  newspaperOutline,
} from "ionicons/icons";
import {
  selectCartCost,
  selectCartEntries,
  selectCartTax,
} from "../services/cartSlice";
import { useAppSelector } from "../services/Hooks";

interface ContainerProps {}

const OrderCost: React.FC<ContainerProps> = () => {
  const cartCost = useAppSelector(selectCartCost);
  const cartTax = useAppSelector(selectCartTax);
  const cartEntries = useAppSelector(selectCartEntries);

  return (
    <>
      {0 < cartEntries.length ? (
        <>
          <IonItem lines={"full"} color={"light"}>
            <IonLabel>Food</IonLabel>
            <IonIcon icon={fastFoodOutline} slot="start"></IonIcon>
            <IonBadge color="success">${cartCost}</IonBadge>
          </IonItem>
          <IonItem lines={"full"} color={"light"}>
            <IonLabel>Tax</IonLabel>
            <IonIcon icon={listCircleOutline} slot="start"></IonIcon>
            <IonBadge color="success">${cartTax}</IonBadge>
          </IonItem>
          <IonItem lines={"full"} color={"light"}>
            <IonLabel>Total</IonLabel>
            <IonIcon icon={newspaperOutline} slot="start"></IonIcon>
            <IonBadge color="success">${cartCost + cartTax}</IonBadge>
          </IonItem>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderCost;
