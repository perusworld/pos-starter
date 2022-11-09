import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import FoodMenuList from "../components/FoodMenuList";
import Header from "../components/Header";
import { POSService } from "../services/POSService";
import "./MenuTab.css";

const rightNav = () => (
  <>
    <IonButton routerLink="/new-order">
      <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
    </IonButton>
  </>
);

const MenuTab: React.FC = () => {
  const [menu, setMenu] = useState({} as any);

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
      <Header title="Menu" right={rightNav()}></Header>
      <IonContent fullscreen>
        <FoodMenuList grouped={menu?.grouped} showDelete={true} />
      </IonContent>
    </IonPage>
  );
};

export default MenuTab;
