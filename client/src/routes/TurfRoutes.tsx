import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "../routes/protected/AuthRoutes";
import TurfDashboard from "../pages/Turf/TurfDashboard";
import SlotManager from "../components/turf/SlotMangement/SlotManagement";
import TurfDetails from "../components/turf/turfDetials";

export function TurfRoutes() {
  console.log("inside turf route");

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes allowedRoles={["turf"]} element={<TurfDashboard />} />
        }
      />
      <Route
        path="/slotManagement"
        element={
          <ProtectedRoutes allowedRoles={["turf"]} element={<SlotManager />} />
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoutes allowedRoles={["turf"]} element={<TurfDetails />} />
        }
      />
    </Routes>
  );
}
