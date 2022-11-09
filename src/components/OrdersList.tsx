import { IonBadge, IonIcon, IonItem, IonLabel } from "@ionic/react";
import {
  bagCheckOutline,
  closeCircleOutline,
  ellipsisHorizontalOutline,
  helpCircleOutline,
} from "ionicons/icons";

interface ContainerProps {
  orders?: any[];
}

interface OrderStatusIconLeftProps {
  status: string;
}

const OrderStatusIconLeft: React.FC<OrderStatusIconLeftProps> = ({
  status,
}) => {
  switch (status) {
    case "Fulfilled":
      return <IonIcon icon={bagCheckOutline} slot="start"></IonIcon>;
    case "In Progress":
      return <IonIcon icon={ellipsisHorizontalOutline} slot="start"></IonIcon>;
    case "Cancelled":
      return <IonIcon icon={closeCircleOutline} slot="start"></IonIcon>;
    default:
      return <IonIcon icon={helpCircleOutline} slot="start"></IonIcon>;
  }
};

interface OrderStatusRightProps {
  status: string;
}

const OrderStatusRight: React.FC<OrderStatusRightProps> = ({ status }) => {
  switch (status) {
    case "Fulfilled":
      return <IonBadge color="success">{status}</IonBadge>;
    case "In Progress":
      return <IonBadge color="warning">{status}</IonBadge>;
    case "Cancelled":
      return <IonBadge color="danger">{status}</IonBadge>;
    default:
      return <IonBadge color="warning">{status}</IonBadge>;
  }
};

interface OrderItemProps {
  order: any;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <IonItem>
      <IonLabel>{order.name}</IonLabel>
      <OrderStatusIconLeft status={order.status} />
      <OrderStatusRight status={order.status} />
    </IonItem>
  );
};

const OrdersList: React.FC<ContainerProps> = ({ orders = [] }) => {
  return (
    <>
      {orders.map((order, index) => (
        <OrderItem order={order} key={index} />
      ))}
    </>
  );
};

export default OrdersList;
