import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { button, useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const facialExpressions = {
  default: {},
  smile: {
    browInnerUp: 0.17,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.44,
    noseSneerLeft: 0.1700000727403593,
    noseSneerRight: 0.14000002836874015,
    mouthPressLeft: 0.61,
    mouthPressRight: 0.41000000000000003,
  },
  sad: {
    mouthFrownLeft: 0.5,
    mouthFrownRight: 0.4,
    mouthShrugLower: 0.5,
    browInnerUp: 0.452,
    eyeSquintLeft: 0.72,
    eyeSquintRight: 0.75,
    eyeLookDownLeft: 0.5,
    eyeLookDownRight: 0.5,
    jawForward: 0.6,
  }
};
const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_I",
};

const xx = {
  "mouthCue": "{\"metadata\":{\"soundFile\":\"C:\\\\Users\\\\SB\\\\Documents\\\\github\\\\max-node\\\\files\\\\file_1711528619085.wav\",\"duration\":3.94},\"mouthCues\":[{\"start\":0,\"end\":0.01,\"value\":\"X\"},{\"start\":0.01,\"end\":0.08,\"value\":\"B\"},{\"start\":0.08,\"end\":0.17,\"value\":\"D\"},{\"start\":0.17,\"end\":0.21,\"value\":\"C\"},{\"start\":0.21,\"end\":0.29,\"value\":\"A\"},{\"start\":0.29,\"end\":0.35,\"value\":\"C\"},{\"start\":0.35,\"end\":0.55,\"value\":\"B\"},{\"start\":0.55,\"end\":0.83,\"value\":\"F\"},{\"start\":0.83,\"end\":1.04,\"value\":\"B\"},{\"start\":1.04,\"end\":1.11,\"value\":\"G\"},{\"start\":1.11,\"end\":1.46,\"value\":\"B\"},{\"start\":1.46,\"end\":1.53,\"value\":\"C\"},{\"start\":1.53,\"end\":1.6,\"value\":\"D\"},{\"start\":1.6,\"end\":1.68,\"value\":\"A\"},{\"start\":1.68,\"end\":1.81,\"value\":\"F\"},{\"start\":1.81,\"end\":1.88,\"value\":\"C\"},{\"start\":1.88,\"end\":2.02,\"value\":\"B\"},{\"start\":2.02,\"end\":2.3,\"value\":\"C\"},{\"start\":2.3,\"end\":2.42,\"value\":\"A\"},{\"start\":2.42,\"end\":2.48,\"value\":\"B\"},{\"start\":2.48,\"end\":2.6,\"value\":\"G\"},{\"start\":2.6,\"end\":2.67,\"value\":\"E\"},{\"start\":2.67,\"end\":2.88,\"value\":\"B\"},{\"start\":2.88,\"end\":3.02,\"value\":\"D\"},{\"start\":3.02,\"end\":3.09,\"value\":\"H\"},{\"start\":3.09,\"end\":3.16,\"value\":\"B\"},{\"start\":3.16,\"end\":3.23,\"value\":\"C\"},{\"start\":3.23,\"end\":3.37,\"value\":\"B\"},{\"start\":3.37,\"end\":3.51,\"value\":\"D\"},{\"start\":3.51,\"end\":3.58,\"value\":\"B\"},{\"start\":3.58,\"end\":3.72,\"value\":\"C\"},{\"start\":3.72,\"end\":3.93,\"value\":\"B\"},{\"start\":3.93,\"end\":3.94,\"value\":\"X\"}]}"
}


export default function Model ( props ) {

  // const [animation, setAnimation] = useState("idle");
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
  const [facialExpression, setFacialExpression] = useState("");

  const { playAudio, script } = useControls({
    playAudio: button(() => audio.play()),
    winkLeft: button(() => {
      setWinkLeft(true);
      setTimeout(() => setWinkLeft(false), 300);
    }),
    winkRight: button(() => {
      setWinkRight(true);
      setTimeout(() => setWinkRight(false), 300);
    }),
    // animation: {
    //   value: animation,
    //   options: animations.map(( a ) => a.name),
    //   onChange: ( value ) => setAnimation(value),
    // },
    facialExpression: {
      options: Object.keys(facialExpressions),
      onChange: ( value ) => setFacialExpression(value),
    }
  });

  const group = useRef();
  const audio = useMemo(() => new Audio('/file_1711528619085.mp3'), [script]);
  console.log(audio)
  const lipsync = JSON.parse(xx.mouthCue);
  const { nodes, materials, scene } = useGLTF('/models/6601164a880662f11ec7b522.glb')

  // const { animations } = useGLTF("/models/animations.glb");
  // const { actions } = useAnimations(animations, group);


  useFrame(() => {
    Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach(( key ) => {
      const mapping = facialExpressions[facialExpression];
      if(key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
        return; // eyes wink/blink are handled separately
      }
      if(mapping && mapping[key]) {
        lerpMorphTarget(key, mapping[key], 0.1);
      } else {
        lerpMorphTarget(key, 0, 0.1);
      }
    });
    lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
    lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);
    const appliedMorphTargets = [];
    if(lipsync) {
      const currentAudioTime = audio.currentTime;
      for (let i = 0; i < lipsync.mouthCues.length; i++) {
        const mouthCue = lipsync.mouthCues[i];
        if(currentAudioTime > mouthCue.start && currentAudioTime <= mouthCue.end) {
          appliedMorphTargets.push(corresponding[mouthCue.value]);
          lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2);
          break;
        }
      }
    }

    Object.values(corresponding).forEach(( value ) => {
      if(!appliedMorphTargets.includes(value)) {
        lerpMorphTarget(value, 0, 0.1);
      }
    });
  });

  // useEffect(() => {
  // actions[animation].reset().fadeIn(0.5).play();
  // return () => actions[animation]?.fadeOut(0.5);
  // }, [animation]);

  useEffect(() => {
    let blinkTimeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 150);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  const lerpMorphTarget = ( target, value, speed = 0.1 ) => {
    scene.traverse(( child ) => {
      if(child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if(
          index === undefined ||
          child.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        )
      }
    });
  };

  return (
    <group ref={group} {...props} dispose={null}>
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
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  )
}

useGLTF.preload('/models/6601164a880662f11ec7b522.glb')
//  https://models.readyplayer.me/6601164a880662f11ec7b522.glb?morphTargets=ARKit,Oculus Visemes

