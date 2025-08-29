import { usePortflowUIController } from "context";

function SidenavCard({ color, ...rest }) {
  const [controller] = usePortflowUIController();
  const { miniSidenav, sidenavColor } = controller;
}
 export default SidenavCard;
