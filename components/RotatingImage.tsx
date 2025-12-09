import React, { useState, useEffect, useRef } from 'react';

export default function RotatingImage({ src }: { src?: string }): JSX.Element {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('granted');
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);

    if (checkMobile) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        const beta = e.beta ?? 0;
        const gamma = e.gamma ?? 0;

        const rotateX = Math.max(-30, Math.min(30, beta - 45));
        const rotateY = Math.max(-30, Math.min(30, gamma));

        setRotation({ x: rotateX, y: rotateY });
      };

      const requestPermission = async () => {
        if (typeof (DeviceOrientationEvent as any) !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          try {
            const response = await (DeviceOrientationEvent as any).requestPermission();
            setPermission(response === 'granted' ? 'granted' : 'denied');
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation as EventListener);
            }
          } catch (error) {
            console.error('Error al solicitar permiso:', error);
            setPermission('denied');
          }
        } else {
          setPermission('granted');
          window.addEventListener('deviceorientation', handleOrientation as EventListener);
        }
      };

      requestPermission();

      return () => window.removeEventListener('deviceorientation', handleOrientation as EventListener);
    }

    // Desktop mouse handling
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateY = (deltaX / window.innerWidth) * 30;
      const rotateX = -(deltaY / window.innerHeight) * 30;

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePermissionRequest = async () => {
    if (typeof (DeviceOrientationEvent as any) !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        setPermission(response === 'granted' ? 'granted' : 'denied');
        if (response === 'granted') {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {isMobile && permission !== 'granted' && (
        <div className="mb-4 text-center">
          <button
            onClick={handlePermissionRequest}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors shadow-sm"
          >
            Activar Giroscopio
          </button>
          <p className="mt-2 text-sm text-gray-500">Necesitamos acceso al giroscopio</p>
        </div>
      )}

      <div className="relative">
        <div
          ref={imageRef}
          className="w-64 h-64 transition-transform duration-150 ease-out"
          style={{
            transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={src ?? "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop"}
            alt="Imagen rotativa"
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
            style={{ boxShadow: '0 20px 40px -12px rgba(0,0,0,0.55)' }}
          />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
        </div>

        {/* 
        //si se quiere mostrar texto debajo de la imagen
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isMobile
              ? permission === 'granted'
                ? 'Inclina tu dispositivo para rotar'
                : 'Activa el giroscopio para continuar'
              : 'Mueve el mouse para rotar la imagen'}
          </p>
        </div> */}
      </div>
    </div>
  );
}
