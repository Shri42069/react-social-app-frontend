// src/components/Hyperspeed.jsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
} from "postprocessing";

// --- your entire code stays the same UNTIL the component signature ----
// (I trimmed the snippet for brevity – keep your distortion/road/classes as-is)

// Wrap in forwardRef so parent can call methods:
const Hyperspeed = forwardRef(function Hyperspeed(
  {
    className = "",
    effectOptions = {
      onSpeedUp: () => {},
      onSlowDown: () => {},
      distortion: "turbulentDistortion",
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 4,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [400 * 0.03, 400 * 0.2],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0xffffff,
        brokenLines: 0xffffff,
        leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
        rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
        sticks: 0x03b3c3,
      },
    },
  },
  externalRef
) {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useImperativeHandle(externalRef, () => ({
    // Let parent drive the speed-up effect
    boost(on = true) {
      const app = appRef.current;
      if (!app) return;
      if (on) app.onMouseDown(); else app.onMouseUp();
    },
  }));

  useEffect(() => {
    // --------- ALL your internal setup code ----------
    // Replace every place that used: const container = document.getElementById('lights');
    // with the ref:
    const container = containerRef.current;
    if (!container) return;

    // If you had a prior instance:
    if (appRef.current?.dispose) {
      appRef.current.dispose();
      while (container.firstChild) container.removeChild(container.firstChild);
    }

    // ---- keep all your uniforms, distortions, classes (App, Road, etc.) exactly as in your code ----
    // NOTE: In your App class constructor, you used container.append(this.renderer.domElement);
    // That's good and will work with the ref container.

    // After defining all helper classes (Road, CarLights, etc.) and functions,
    // right before your IIFE where you previously did: document.getElementById('lights')
    (function () {
      const options = { ...effectOptions };
      options.distortion = distortions[options.distortion]; // keep your distortions map

      const myApp = new App(container, options);
      appRef.current = myApp;
      myApp.loadAssets().then(myApp.init);
    })();

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
        // clear dom
        while (container.firstChild) container.removeChild(container.firstChild);
      }
    };
  }, [effectOptions]); // if you want live prop changes, keep this; else [].

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
});

export default Hyperspeed;
