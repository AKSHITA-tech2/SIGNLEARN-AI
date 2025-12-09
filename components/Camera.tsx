import React, { useRef, useEffect, useState } from 'react';

interface CameraProps {
  onCapture?: (imageSrc: string) => void;
  active?: boolean;
  label?: string;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, active = true, label = "AI Camera Active" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (active) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [active]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleSnapshot = () => {
    if (videoRef.current && canvasRef.current && onCapture) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Draw video frame to canvas
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        // Get data URL
        const imageSrc = canvasRef.current.toDataURL('image/jpeg');
        onCapture(imageSrc);
      }
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video shadow-xl border-4 border-slate-200">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="w-full h-full object-cover transform scale-x-[-1]" 
      />
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
      
      {/* Overlay UI */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        {label}
      </div>

      {onCapture && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <button 
            onClick={handleSnapshot}
            className="bg-white rounded-full p-4 shadow-lg border-4 border-indigo-500 hover:scale-110 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500" />
          </button>
        </div>
      )}
      
      {/* Simulated Hand Tracking Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Just a decorative rect to simulate 'detection' area */}
             <rect x="25" y="25" width="50" height="50" rx="5" stroke="cyan" strokeWidth="0.5" fill="none" strokeDasharray="2 2" className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
};
