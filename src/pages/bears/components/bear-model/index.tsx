/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Offy (https://sketchfab.com/axe163)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/we-bare-bears-c2f75dd26f83451994703086e0b19c42
title: We Bare Bears
*/

import { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useBears } from "../..";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import "./bear-model.scss";
import { useFrame } from "@react-three/fiber";
export default function Model(props: any) {
  const bears = useBears((state) => state.bears);
  const { nodes, materials } = useGLTF("/scene.glb") as any;

  const bearTypeLookup = {
    brown: {
      material: materials["Material.003"],
      geometry: nodes.Circle_1.geometry,
    },
    white: {
      material: materials["Material.004"],
      geometry: nodes.Circle002_1.geometry,
    },
    koala: {
      material: materials["Material.005"],
      geometry: nodes.Circle003_1.geometry,
    },
  };

  const ref = useRef<any>();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
    // ref.current.rotation.y = Math.sin(t / 4) / 8;
    // ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
    // ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {bears.map((bear, index) => {
          const bearType = bearTypeLookup[bear.type];
          return (
            <group
              position={[0, 0, index * 2.1]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              scale={1}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={bearType.geometry}
                material={bearType.material}
              >
                <Html scale={1} position={[-1, -0.6, -1.4]}>
                  <div className="bear-card">
                    <div className="bear-card-title">{bear.name}</div>
                  </div>
                </Html>
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

useGLTF.preload("/scene.glb");