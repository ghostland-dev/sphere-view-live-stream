
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import VRViewer from "../components/VRViewer";

const ViewerPage = () => {
  const [searchParams] = useSearchParams();
  const panoramaIndex = searchParams.get('panorama');

  return <VRViewer initialPanorama={panoramaIndex ? parseInt(panoramaIndex) : 0} />;
};

export default ViewerPage;
