import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Panel from "layouts/Panel";
import BerthInfo from "layouts/berthInfo";
import Admin from "layouts/Admin";
import SignIn from "layouts/authentication/sign-in";
import Reports from "layouts/reports";
import ProtectedRoute from "components/ProtectedRoute";
import { IoBoat } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTabletFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { BsCursorFill } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";

// Function to get routes based on user role
const getRoutes = (userRole) => {
  const baseRoutes = [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <IoHome size="15px" color="inherit" />,
      component: <Dashboard />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Ship Scheduling",
      key: "tables",
      route: "/ShipScheduling",
      icon: <IoBoat size="15px" color="inherit" />,
      component: <Tables />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Berth Utilization",
      key: "berthInfo",
      route: "/BerthUtilization",
      icon: <BsFillTabletFill size="15px" color="inherit" />,
      component: <BerthInfo />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Manual Override",
      key: "panel",
      route: "/ManualOverride",
      icon: <BsCursorFill size="15px" color="inherit" />,
      component: <Panel />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Reports & Logs",
      key: "reports",
      route: "/Reports&Logs",
      icon: <BsCardChecklist size="15px" color="inherit" />,
      component: <Reports />,
      noCollapse: true,
    },
  ];

  // Add admin panel only for admin users
  if (userRole === "Admin") {
    baseRoutes.push(
      { type: "title", title: "Handler Pages", key: "account-pages" },
      {
        type: "collapse",
        name: "Admin Panel",
        key: "admin",
        route: "/Admin",
        icon: <IoIosDocument size="15px" color="inherit" />,
        component: (
          <ProtectedRoute requiredRole="Admin">
            <Admin />
          </ProtectedRoute>
        ),
        noCollapse: true,
      }
    );
  }

  // Add sign-in for non-authenticated users
  if (!userRole) {
    baseRoutes.push({
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      route: "/sign-in",
      icon: <BsFillPersonFill size="15px" color="inherit" />,
      component: <SignIn />,
      noCollapse: true,
    });
  }

  return baseRoutes;
};

// Default routes for when user context is not available
const routes = getRoutes(null);

export { getRoutes };
export default routes;
