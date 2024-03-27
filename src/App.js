import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Avatar from "./Avatar";

const App = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 1.5], fov: 40 }}>
      <Avatar position={[0, -3.1, 0]} scale={2}/>
      <Environment preset="city"/>
      {/*<OrbitControls/>*/}
    </Canvas>
  );
};

export default App;
