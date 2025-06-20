import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BricksLoader from "./BricksLoader/BricksLoader";

const GlobalLoader = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, right: 0, bottom: 0, left: 0,
        backgroundColor: "rgba(255,255,255,0.7)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <BricksLoader />
    </div>
  );
};

export default GlobalLoader;
