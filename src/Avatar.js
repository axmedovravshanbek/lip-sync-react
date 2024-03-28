import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { button, useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Male1 from "./Male1";
import Female1 from "./Female1";
import Female2 from "./Female2";

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

const chars = {
  'Male 1': {
    component: <Male1/>,
    path: '/models/6604ff79197732ba755e4c48.glb',
    audio: '/file_1711601501992.mp3',
    mouthCue: "{\"metadata\":{\"soundFile\":\"C:\\\\Users\\\\SB\\\\Documents\\\\github\\\\max-node\\\\files\\\\file_1711601501992.wav\",\"duration\":4.43},\"mouthCues\":[{\"start\":0,\"end\":0.21,\"value\":\"B\"},{\"start\":0.21,\"end\":0.49,\"value\":\"F\"},{\"start\":0.49,\"end\":0.56,\"value\":\"B\"},{\"start\":0.56,\"end\":0.77,\"value\":\"C\"},{\"start\":0.77,\"end\":0.91,\"value\":\"B\"},{\"start\":0.91,\"end\":1.05,\"value\":\"D\"},{\"start\":1.05,\"end\":1.12,\"value\":\"C\"},{\"start\":1.12,\"end\":1.22,\"value\":\"A\"},{\"start\":1.22,\"end\":1.37,\"value\":\"E\"},{\"start\":1.37,\"end\":1.79,\"value\":\"B\"},{\"start\":1.79,\"end\":1.98,\"value\":\"X\"},{\"start\":1.98,\"end\":2.06,\"value\":\"B\"},{\"start\":2.06,\"end\":2.14,\"value\":\"A\"},{\"start\":2.14,\"end\":2.27,\"value\":\"E\"},{\"start\":2.27,\"end\":2.41,\"value\":\"F\"},{\"start\":2.41,\"end\":2.55,\"value\":\"B\"},{\"start\":2.55,\"end\":2.76,\"value\":\"C\"},{\"start\":2.76,\"end\":2.9,\"value\":\"B\"},{\"start\":2.9,\"end\":2.96,\"value\":\"A\"},{\"start\":2.96,\"end\":3.02,\"value\":\"C\"},{\"start\":3.02,\"end\":3.1,\"value\":\"A\"},{\"start\":3.1,\"end\":3.41,\"value\":\"F\"},{\"start\":3.41,\"end\":3.55,\"value\":\"B\"},{\"start\":3.55,\"end\":3.69,\"value\":\"G\"},{\"start\":3.69,\"end\":3.76,\"value\":\"E\"},{\"start\":3.76,\"end\":3.83,\"value\":\"B\"},{\"start\":3.83,\"end\":3.97,\"value\":\"D\"},{\"start\":3.97,\"end\":4.18,\"value\":\"B\"},{\"start\":4.18,\"end\":4.43,\"value\":\"X\"}]}"
  },
  'Female 1': {
    component: <Female1/>,
    path: '/models/6601164a880662f11ec7b522.glb',
    audio: '/file_1711528619085.mp3',
    mouthCue: "{\"metadata\":{\"soundFile\":\"C:\\\\Users\\\\SB\\\\Documents\\\\github\\\\max-node\\\\files\\\\file_1711528619085.wav\",\"duration\":3.94},\"mouthCues\":[{\"start\":0,\"end\":0.01,\"value\":\"X\"},{\"start\":0.01,\"end\":0.08,\"value\":\"B\"},{\"start\":0.08,\"end\":0.17,\"value\":\"D\"},{\"start\":0.17,\"end\":0.21,\"value\":\"C\"},{\"start\":0.21,\"end\":0.29,\"value\":\"A\"},{\"start\":0.29,\"end\":0.35,\"value\":\"C\"},{\"start\":0.35,\"end\":0.55,\"value\":\"B\"},{\"start\":0.55,\"end\":0.83,\"value\":\"F\"},{\"start\":0.83,\"end\":1.04,\"value\":\"B\"},{\"start\":1.04,\"end\":1.11,\"value\":\"G\"},{\"start\":1.11,\"end\":1.46,\"value\":\"B\"},{\"start\":1.46,\"end\":1.53,\"value\":\"C\"},{\"start\":1.53,\"end\":1.6,\"value\":\"D\"},{\"start\":1.6,\"end\":1.68,\"value\":\"A\"},{\"start\":1.68,\"end\":1.81,\"value\":\"F\"},{\"start\":1.81,\"end\":1.88,\"value\":\"C\"},{\"start\":1.88,\"end\":2.02,\"value\":\"B\"},{\"start\":2.02,\"end\":2.3,\"value\":\"C\"},{\"start\":2.3,\"end\":2.42,\"value\":\"A\"},{\"start\":2.42,\"end\":2.48,\"value\":\"B\"},{\"start\":2.48,\"end\":2.6,\"value\":\"G\"},{\"start\":2.6,\"end\":2.67,\"value\":\"E\"},{\"start\":2.67,\"end\":2.88,\"value\":\"B\"},{\"start\":2.88,\"end\":3.02,\"value\":\"D\"},{\"start\":3.02,\"end\":3.09,\"value\":\"H\"},{\"start\":3.09,\"end\":3.16,\"value\":\"B\"},{\"start\":3.16,\"end\":3.23,\"value\":\"C\"},{\"start\":3.23,\"end\":3.37,\"value\":\"B\"},{\"start\":3.37,\"end\":3.51,\"value\":\"D\"},{\"start\":3.51,\"end\":3.58,\"value\":\"B\"},{\"start\":3.58,\"end\":3.72,\"value\":\"C\"},{\"start\":3.72,\"end\":3.93,\"value\":\"B\"},{\"start\":3.93,\"end\":3.94,\"value\":\"X\"}]}"
  },
  'Female 2': {
    component: <Female2/>,
    path: '/models/660503642aa392635c3178cd.glb',
    audio: '/file_1711538630792.mp3',
    mouthCue: "{\"metadata\":{\"soundFile\":\"C:\\\\Users\\\\SB\\\\Documents\\\\github\\\\max-node\\\\files\\\\file_1711538630792.wav\",\"duration\":3.77},\"mouthCues\":[{\"start\":0,\"end\":0.47,\"value\":\"B\"},{\"start\":0.47,\"end\":0.54,\"value\":\"C\"},{\"start\":0.54,\"end\":0.82,\"value\":\"B\"},{\"start\":0.82,\"end\":0.89,\"value\":\"C\"},{\"start\":0.89,\"end\":0.96,\"value\":\"B\"},{\"start\":0.96,\"end\":1.1,\"value\":\"C\"},{\"start\":1.1,\"end\":1.17,\"value\":\"H\"},{\"start\":1.17,\"end\":1.25,\"value\":\"A\"},{\"start\":1.25,\"end\":1.38,\"value\":\"C\"},{\"start\":1.38,\"end\":1.45,\"value\":\"B\"},{\"start\":1.45,\"end\":1.52,\"value\":\"C\"},{\"start\":1.52,\"end\":1.68,\"value\":\"B\"},{\"start\":1.68,\"end\":1.76,\"value\":\"A\"},{\"start\":1.76,\"end\":1.85,\"value\":\"E\"},{\"start\":1.85,\"end\":1.92,\"value\":\"F\"},{\"start\":1.92,\"end\":2.2,\"value\":\"B\"},{\"start\":2.2,\"end\":2.27,\"value\":\"F\"},{\"start\":2.27,\"end\":2.55,\"value\":\"B\"},{\"start\":2.55,\"end\":2.65,\"value\":\"A\"},{\"start\":2.65,\"end\":2.71,\"value\":\"C\"},{\"start\":2.71,\"end\":2.83,\"value\":\"B\"},{\"start\":2.83,\"end\":2.9,\"value\":\"C\"},{\"start\":2.9,\"end\":2.97,\"value\":\"B\"},{\"start\":2.97,\"end\":3.04,\"value\":\"C\"},{\"start\":3.04,\"end\":3.25,\"value\":\"B\"},{\"start\":3.25,\"end\":3.33,\"value\":\"A\"},{\"start\":3.33,\"end\":3.48,\"value\":\"C\"},{\"start\":3.48,\"end\":3.76,\"value\":\"B\"},{\"start\":3.76,\"end\":3.77,\"value\":\"X\"}]}"
  }
}

export default function Model () {

  // const [animation, setAnimation] = useState("idle");
  // const [char, setCharId] = useState(0);
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
  const [facialExpression, setFacialExpression] = useState("");


  const { playAudio, char } = useControls({
    playAudio: false,
    char: {
      value: "Male 1",
      options: ["Male 1", "Female 1", "Female 2"],
    },
    // playAudio: button(() => console.log(char)),
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
  const audio = useMemo(() => new Audio(chars[char].audio), [char])
  const lipsync = JSON.parse(chars[char].mouthCue)

  const { nodes, materials, scene } = useGLTF(chars[char].path)

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
    if(playAudio) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playAudio, char]);

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

  return React.cloneElement(chars[char].component, { group, nodes, materials })
}

// useGLTF.preload('/models/6601164a880662f11ec7b523.glb')
//  https://models.readyplayer.me/6601164a880662f11ec7b522.glb?morphTargets=ARKit,Oculus Visemes
//  https://models.readyplayer.me/6604ff79197732ba755e4c48.glb?morphTargets=ARKit,Oculus Visemes
//  https://models.readyplayer.me/660503642aa392635c3178cd.glb?morphTargets=ARKit,Oculus Visemes
