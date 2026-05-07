import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel, afterLabel }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Raw position 0–100, spring-smoothed for rendering
  const rawX = useMotionValue(50);
  const springX = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.3 });

  // Clip the before image: hides the right portion
  const beforeClip = useTransform(springX, v => `inset(0 ${100 - v}% 0 0)`);
  // Divider + handle left position
  const leftPct = useTransform(springX, v => `${v}%`);

  // Labels fade out when their side is no longer visible
  const beforeLabelOpacity = useTransform(springX, [0, 12, 22], [0, 0, 1]);
  const afterLabelOpacity  = useTransform(springX, [78, 88, 100], [1, 0, 0]);

  const getPosition = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    rawX.set(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    // Capture keeps events flowing even if cursor leaves the element
    containerRef.current?.setPointerCapture(e.pointerId);
    getPosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    getPosition(e.clientX);
  };

  const onPointerUp = () => { isDragging.current = false; };

  // Intro hint: wiggle left then return to centre
  useEffect(() => {
    const t = setTimeout(() => {
      animate(rawX, [50, 28, 50], {
        duration: 1.6,
        ease: [0.4, 0, 0.2, 1],
      });
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded-[2rem] cursor-col-resize touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After image – always full size underneath */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Before image – clipped on the right so only left portion shows */}
      <motion.img
        src={beforeSrc}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: beforeClip }}
        draggable={false}
      />

      {/* Divider line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
        style={{
          left: leftPct,
          x: '-50%',
          boxShadow: '0 0 16px rgba(255,255,255,0.6), 0 0 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* Drag handle */}
      <motion.div
        className="absolute top-1/2 z-30 pointer-events-none"
        style={{ left: leftPct, x: '-50%', y: '-50%' }}
      >
        <motion.div
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-gray-100"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.1)' }}
          whileTap={{ scale: 0.92 }}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M6 1L1 7L6 13" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 1L19 7L14 13" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Labels */}
      <motion.div
        style={{ opacity: beforeLabelOpacity }}
        className="absolute bottom-5 left-5 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[11px] font-semibold uppercase tracking-wider text-white pointer-events-none"
      >
        {beforeLabel}
      </motion.div>
      <motion.div
        style={{ opacity: afterLabelOpacity }}
        className="absolute bottom-5 right-5 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[11px] font-semibold uppercase tracking-wider text-white pointer-events-none"
      >
        {afterLabel}
      </motion.div>
    </div>
  );
}
