import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Avatar from "./Avatar";

const App = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 1.5], fov: 40 }}>
      <Avatar />
      <Environment preset="city"/>
      {/*<OrbitControls/>*/}
    </Canvas>
  );
};

export default App;
