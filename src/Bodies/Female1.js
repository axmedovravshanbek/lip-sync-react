import React from 'react';
import { useGLTF } from "@react-three/drei";

const Female1 = ( { group, nodes, materials } ) => {
  return (
    <group ref={group} position={[0, -3.1, 0]} scale={2} dispose={null}>
      <primitive object={nodes.Hips}/>
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes['hair-60'].geometry}
        material={materials.M_Hair_60}
        skeleton={nodes['hair-60'].skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      {/*<skinnedMesh*/}
      {/*  geometry={nodes.Wolf3D_Body.geometry}*/}
      {/*  material={materials.Wolf3D_Body}*/}
      {/*  skeleton={nodes.Wolf3D_Body.skeleton}*/}
      {/*/>*/}
      {/*<skinnedMesh*/}
      {/*  geometry={nodes.Wolf3D_Outfit_Bottom.geometry}*/}
      {/*  material={materials.Wolf3D_Outfit_Bottom}*/}
      {/*  skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}*/}
      {/*/>*/}
      {/*<skinnedMesh*/}
      {/*  geometry={nodes.Wolf3D_Outfit_Footwear.geometry}*/}
      {/*  material={materials.Wolf3D_Outfit_Footwear}*/}
      {/*  skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}*/}
      {/*/>*/}
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
};

export default Female1;

useGLTF.preload('/6601164a880662f11ec7b522.glb')
