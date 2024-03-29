import { Billboard, Text } from "@react-three/drei";
import React from "react";

type TextProps = {
  position: [x: number, y: number, z: number];
  text: string;
  size?: number;
  onClick?: (arg0?: unknown) => void;
};

export const BillboardWithText = (props: TextProps) => {
  const { position, text, size, onClick } = props;

  return (
    <Billboard
      follow
      lockX={false}
      lockY={false}
      lockZ={false}
      position={position}
      onClick={onClick}
      castShadow
    >
      <Text
        fontSize={size ?? 0.75}
        outlineWidth="5%"
        outlineColor="#EEE"
        anchorX="center"
        anchorY="bottom-baseline"
        color="#111"
        castShadow
      >
        {text}
      </Text>
    </Billboard>
  );
};
