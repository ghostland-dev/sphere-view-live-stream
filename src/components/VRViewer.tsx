
import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight,
  Info
} from "lucide-react";

// List of panorama scenes
const PANORAMAS = [
  { 
    id: 1, 
    name: "Beach Sunrise", 
    url: "https://images.unsplash.com/photo-1505533321630-975218a5f66f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Beautiful sunrise on a tropical beach" 
  },
  { 
    id: 2, 
    name: "Mountain View", 
    url: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Panoramic mountain landscape at sunset" 
  },
  { 
    id: 3, 
    name: "City Skyline", 
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Urban skyline with skyscrapers" 
  }
];

// The panorama sphere component
const PanoramaSphere = ({ url }: { url: string }) => {
  const texture = useTexture(url);
  
  // Flip the texture inside out
  texture.mapping = THREE.EquirectangularReflectionMapping;
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

// Main VR Viewer component
const VRViewer = () => {
  const [currentPanorama, setCurrentPanorama] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const nextPanorama = () => {
    setCurrentPanorama((prev) => (prev + 1) % PANORAMAS.length);
  };

  const prevPanorama = () => {
    setCurrentPanorama((prev) => (prev - 1 + PANORAMAS.length) % PANORAMAS.length);
  };

  const toggleAutoRotate = () => {
    setAutoRotate(prev => !prev);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <PanoramaSphere url={PANORAMAS[currentPanorama].url} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={rotationSpeed} 
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
        <Environment preset="sunset" />
      </Canvas>
      
      {/* Controls overlay */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 p-2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={prevPanorama}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={nextPanorama}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Scene info overlay */}
      {showInfo && (
        <div className="absolute top-6 left-6 right-6 bg-black/70 text-white p-4 rounded-lg z-10">
          <h2 className="text-xl font-bold mb-2">{PANORAMAS[currentPanorama].name}</h2>
          <p>{PANORAMAS[currentPanorama].description}</p>
          <div className="mt-4">
            <label className="block mb-2">Rotation Speed:</label>
            <Slider 
              value={[rotationSpeed]} 
              min={0.1} 
              max={2} 
              step={0.1} 
              onValueChange={(value) => setRotationSpeed(value[0])}
              className="max-w-xs"
            />
            <div className="mt-4 flex items-center">
              <input 
                type="checkbox"
                id="autoRotate"
                checked={autoRotate}
                onChange={toggleAutoRotate}
                className="mr-2"
              />
              <label htmlFor="autoRotate">Auto-rotate scene</label>
            </div>
          </div>
        </div>
      )}
      
      {/* Scene indicator */}
      <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full z-10">
        {currentPanorama + 1} / {PANORAMAS.length}
      </div>
      
      {/* Instruction overlay that fades away */}
      <div className="absolute top-1/2 left-0 right-0 text-center text-white opacity-70 pointer-events-none animate-fade-out z-10">
        Drag to look around
      </div>
    </div>
  );
};

export default VRViewer;
