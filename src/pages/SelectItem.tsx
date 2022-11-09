import {
  IonBadge,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  useIonLoading,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import FoodMenuList from "../components/FoodMenuList";
import Header from "../components/Header";
import { addToCart, selectCartCount } from "../services/cartSlice";
import { useAppDispatch, useAppSelector } from "../services/Hooks";
import { POSService } from "../services/POSService";
import { snooze } from "../services/Utils";
import "./SelectItem.css";

const SelectItemPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const [present, dismiss] = useIonLoading();

  const [menu, setMenu] = useState({} as any);

  const onAddToCart = async (itm: any) => {
    await present({ message: "Adding item to cart" });
    await snooze();
    await dismiss();
    dispatch(addToCart(itm));
  };

  useEffect(() => {
    console.log("load menu");
    const loadData = async () => {
      const menu = await POSService.menu(false);
      setMenu(menu ? { grouped: POSService.group(menu?.menu) } : {});
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
      <Header title="Select Menu Item" back={true}></Header>
      <IonContent fullscreen>
        <IonItem lines={"full"} color={"dark"}>
          <IonLabel>Items In Cart</IonLabel>
          <IonIcon icon={cartOutline} slot="start"></IonIcon>
          <IonBadge color="danger">{cartCount}</IonBadge>
        </IonItem>
        <FoodMenuList
          grouped={menu?.grouped}
          showAddToCard={true}
          onAddToCard={onAddToCart}
        />
      </IonContent>
    </IonPage>
  );
};

export default SelectItemPage;
