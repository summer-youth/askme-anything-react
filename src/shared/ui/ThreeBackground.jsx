import React, { useEffect, useRef } from 'react';

export function ThreeBackground() {
  const mountRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    let THREE;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = mountRef.current;
    if (!container) return;
    let renderer, geometry, material, points, camera;

    import('three')
      .then((mod) => {
        THREE = mod;
        const scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.className = 'bg-canvas';
        container.appendChild(renderer.domElement);

        const particles = 400;
        geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particles * 3);
        for (let i = 0; i < particles; i++) {
          positions[i * 3 + 0] = (Math.random() - 0.5) * 200;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        material = new THREE.PointsMaterial({ color: 0x7c5cff, size: 0.9, sizeAttenuation: true, transparent: true, opacity: 0.7 });
        points = new THREE.Points(geometry, material);
        scene.add(points);

        const clock = new THREE.Clock();
        const animate = () => {
          const t = clock.getElapsedTime();
          points.rotation.y = t * 0.04;
          points.rotation.x = Math.sin(t * 0.2) * 0.05;
          renderer.render(scene, camera);
          rafRef.current = requestAnimationFrame(animate);
        };

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        if (!prefersReducedMotion) animate(); else renderer.render(scene, camera);
      })
      .catch(() => {
        // fail silently if three isn't available
      });

    return () => {
      cancelAnimationFrame(rafRef.current);
      try {
        window.removeEventListener('resize', () => {});
        geometry && geometry.dispose();
        material && material.dispose();
        renderer && renderer.dispose();
        if (renderer?.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      } catch {}
    };
  }, []);

  return <div ref={mountRef} />;
}


