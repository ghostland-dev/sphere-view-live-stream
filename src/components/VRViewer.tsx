
import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight,
  Info
} from "lucide-react";

// List of panorama scenes (synchronized with Gallery)
const PANORAMAS = [
  { 
    id: 1, 
    name: "Lever de Soleil sur la Plage", 
    url: "https://images.unsplash.com/photo-1505533321630-975218a5f66f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Un magnifique lever de soleil sur une plage tropicale avec des eaux cristallines"
  },
  { 
    id: 2, 
    name: "Vue Panoramique des Montagnes", 
    url: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Paysage montagneux panoramique au coucher du soleil avec une vue à couper le souffle"
  },
  { 
    id: 3, 
    name: "Horizon Urbain", 
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Skyline urbain moderne avec des gratte-ciels illuminés en soirée"
  },
  { 
    id: 4, 
    name: "Forêt Tropicale", 
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Au cœur d'une forêt tropicale luxuriante avec une biodiversité exceptionnelle"
  },
  { 
    id: 5, 
    name: "Désert Sahara", 
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Dunes infinies du Sahara sous un ciel étoilé magnifique"
  },
  { 
    id: 6, 
    name: "Aurores Boréales", 
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Spectacle magique des aurores boréales dans le ciel arctique"
  }
];

// The panorama sphere component
function PanoramaSphere({ url }: { url: string }) {
  const texture = useTexture(url);
  
  // Configure the texture for a panorama sphere
  texture.mapping = THREE.EquirectangularReflectionMapping;
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

// Main VR Viewer component
const VRViewer = ({ initialPanorama = 0 }: { initialPanorama?: number }) => {
  // Validate and clamp the initial panorama index
  const validInitialPanorama = Math.max(0, Math.min(initialPanorama, PANORAMAS.length - 1));
  const [currentPanorama, setCurrentPanorama] = useState(validInitialPanorama);
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
      <Canvas flat camera={{ position: [0, 0, 0.1], fov: 75 }}>
        {PANORAMAS[currentPanorama] && <PanoramaSphere url={PANORAMAS[currentPanorama].url} />}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={rotationSpeed} 
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
        
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
          <h2 className="text-xl font-bold mb-2">{PANORAMAS[currentPanorama]?.name}</h2>
          <p>{PANORAMAS[currentPanorama]?.description}</p>
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
      {PANORAMAS[currentPanorama] && (
        <div className="absolute top-1/2 left-0 right-0 text-center text-white opacity-70 pointer-events-none animate-fade-out z-10">
          Drag to look around
        </div>
      )}
    </div>
  );
};

export default VRViewer;
