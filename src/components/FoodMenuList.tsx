import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { cartOutline, trashOutline } from "ionicons/icons";

interface BaseProps {
  showDelete?: boolean;
  showAddToCard?: boolean;
  onDelete?: (menuItem: any) => void;
  onAddToCard?: (menuItem: any) => void;
}

interface MenuItemProps extends BaseProps {
  menuItem: any;
}

interface ContainerProps extends BaseProps {
  grouped?: any[][];
}

const MenuItem: React.FC<MenuItemProps> = ({
  menuItem,
  showDelete = false,
  showAddToCard = false,
  onDelete = (itm) => {},
  onAddToCard = (itm) => {},
}) => {
  return (
    <IonCard>
      <img alt={menuItem.name} src={menuItem.image} />
      <IonCardHeader>
        <IonCardTitle>{menuItem.name}</IonCardTitle>
        <IonCardSubtitle>{menuItem.price}</IonCardSubtitle>
      </IonCardHeader>
      {showDelete || showAddToCard ? (
        <IonCardContent>
          {showDelete ? (
            <IonButton
              fill="solid"
              color={"danger"}
              onClick={() => onDelete(menuItem)}
            >
              <IonIcon slot="start" icon={trashOutline}></IonIcon>
              Delete
            </IonButton>
          ) : (
            <></>
          )}
          {showAddToCard ? (
            <IonButton
              fill="solid"
              color={"primary"}
              onClick={() => onAddToCard(menuItem)}
            >
              <IonIcon slot="start" icon={cartOutline}></IonIcon>
              Add To Cart
            </IonButton>
          ) : (
            <></>
          )}
        </IonCardContent>
      ) : (
        <></>
      )}
    </IonCard>
  );
};

const FoodMenuList: React.FC<ContainerProps> = ({
  grouped = [],
  showDelete,
  showAddToCard,
  onAddToCard,
  onDelete,
}) => {
  return (
    <>
      <IonGrid>
        {grouped.map((menus: any, indexX: number) => (
          <IonRow key={indexX}>
            {menus.map((menu: any, indexY: number) => (
              <IonCol size="12" size-md="4" size-lg="4" key={`col-${indexX}-${indexY}`}>
                <MenuItem
                  menuItem={menu}
                  key={`${indexX}-${indexY}`}
                  showDelete={showDelete}
                  showAddToCard={showAddToCard}
                  onDelete={onDelete}
                  onAddToCard={onAddToCard}
                />
              </IonCol>
            ))}
          </IonRow>
        ))}
      </IonGrid>
    </>
  );
};

export default FoodMenuList;
