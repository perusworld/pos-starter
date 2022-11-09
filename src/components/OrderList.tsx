import { IonBadge, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { selectCartEntries } from "../services/cartSlice";
import { useAppSelector } from "../services/Hooks";
import OrderCost from "./OrderCost";

interface ContainerProps {}

interface CartItemProps {
  order: any;
}

const CartItem: React.FC<CartItemProps> = ({ order }) => {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <img alt={order?.item?.name} src={order?.item?.image} />
      </IonThumbnail>
      <IonLabel>
        <h2>{order?.item?.name}</h2>
        <p>{order?.item?.price}</p>
      </IonLabel>
      <IonBadge slot="end" color={"success"}>
        {order?.qty}
      </IonBadge>
    </IonItem>
  );
};

const OrderList: React.FC<ContainerProps> = () => {
  const cartEntries = useAppSelector(selectCartEntries);

  return (
    <>
      {cartEntries.map((order, index) => (
        <CartItem order={order} key={index} />
      ))}
      <OrderCost></OrderCost>
    </>
  );
};

export default OrderList;
