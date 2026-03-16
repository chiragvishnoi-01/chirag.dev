import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function Background3D() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const particleCount = 200;
  const maxDistance = 1.5;

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    return [positions, velocities];
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      // Bounce off walls
      if (Math.abs(positions[i * 3]) > 5) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 2.5) velocities[i].z *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update lines based on distance
    const linePositions = [];
    const lineColors = [];
    const color1 = new THREE.Color('#dc2626'); // Red
    const color2 = new THREE.Color('#2563eb'); // Blue

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );

          const alpha = 1.0 - dist / maxDistance;
          const color = new THREE.Color().lerpColors(color1, color2, Math.random());
          
          lineColors.push(
            color.r, color.g, color.b, alpha,
            color.r, color.g, color.b, alpha
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));

    // Parallax effect with mouse
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;

    pointsRef.current.rotation.x += 0.001;
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.x += 0.001;
    linesRef.current.rotation.y += 0.001;

    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
    linesRef.current.position.x += (targetX - linesRef.current.position.x) * 0.05;
    linesRef.current.position.y += (targetY - linesRef.current.position.y) * 0.05;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}
