import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ReactNode } from "react";

interface ContainerProps {
  back?: boolean;
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
}

const Header: React.FC<ContainerProps> = ({
  back = false,
  left = undefined,
  right = undefined,
  title = undefined,
}) => {
  const resolveTitle = () => {
    return undefined === title ? "App" : title;
  };

  const getTitle = () => {
    return resolveTitle();
  };

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          {back ? <IonBackButton></IonBackButton> : null}
          {left}
        </IonButtons>
        <IonTitle class="ion-text-center" color="light">
          {getTitle()}
        </IonTitle>
        <IonButtons slot="end">
          {right}
          {/* {personalInfo && isAuthenticated(userContext?.userState) ? (
            <IonText>
              {personalInfo?.alias} ({personalInfo?.name})
            </IonText>
          ) : null} */}
          {/* {isAuthenticated(userContext?.userState) ? (
            <IonButton onClick={onLogout}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          ) : null} */}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
