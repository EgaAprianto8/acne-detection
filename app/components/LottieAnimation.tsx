"use client";

import React from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationData: any;
  className?: string;
}

const LottieAnimation = ({ animationData, className }: LottieAnimationProps) => {
  return (
    <div className={className}>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true} 
      />
    </div>
  );
};

export default LottieAnimation;