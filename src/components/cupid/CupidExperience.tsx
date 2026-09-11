import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface CupidExperienceProps {
  onBack: () => void;
}

type AnimationStage = 
  | 'scene1_idle'              // Cupid top-left aiming down at heart, "Click me" active
  | 'scene1_slowmo_flight'     // Arrow soaring in graceful slow motion across screen
  | 'scene1_pierced'           // Arrow pierced through heart in 2D crossing effect (1 sec pause)
  | 'scene1_exit_flight'       // Arrow dislodges and shoots towards Scene 2
  | 'scene2_incoming_flight'   // Arrow visible flying across Scene 2 towards the person
  | 'scene2_hand_to_heart'     // Arrow hits chest, right hand moves onto heart
  | 'scene2_eyes_popping'      // Eyes pop out of sockets on springy cartoon stalks (boing!)
  | 'scene2_smitten';          // Full lovestruck state with hearts and replay button

export const CupidExperience: React.FC<CupidExperienceProps> = ({ onBack }) => {
  const [stage, setStage] = useState<AnimationStage>('scene1_idle');
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());

  // Animation values
  const [flightP, setFlightP] = useState(0);             // 0 to 1 for Scene 1 slow-mo flight
  const [scene2FlightP, setScene2FlightP] = useState(0); // 0 to 1 for Scene 2 arrow flight
  const [arrowVibe, setArrowVibe] = useState(0);         // Damped vibration on heart pierce
  const [eyePopProgress, setEyePopProgress] = useState(0);// 0 to 1 with spring overshoot
  const [handProgress, setHandProgress] = useState(0);   // 0 to 1 hand to chest
  const [heartShock, setHeartShock] = useState(1);       // Impact pulse on heart
  const [time, setTime] = useState(0);                   // Continuous loop clock

  const animFrameRef = useRef<number | null>(null);
  const stageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flightIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fastHeartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sound toggle
  const toggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  // Continuous animation loop for sine-wave physics (Cupid hovering, wing fluttering, heart breathing)
  useEffect(() => {
    let t = 0;
    const loop = () => {
      t += 0.035;
      setTime(t);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (stageTimerRef.current) clearTimeout(stageTimerRef.current);
      if (flightIntervalRef.current) clearInterval(flightIntervalRef.current);
      if (fastHeartbeatRef.current) clearInterval(fastHeartbeatRef.current);
    };
  }, []);

  // Trigger Arrow Release when user clicks the heart
  const handleHeartClick = () => {
    if (stage !== 'scene1_idle') return;

    // 1. Bowstring release sound
    sound.playBowRelease();
    sound.playArrowWhistle();
    setStage('scene1_slowmo_flight');

    // 2. Slow Motion Arrow Flight across Scene 1 (1500 ms duration)
    const flightStart = Date.now();
    const flightDuration = 1500; // Cinematic slow motion!

    flightIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const p = Math.min(1, (now - flightStart) / flightDuration);
      // Linear progression for constant slow motion speed
      setFlightP(p);

      if (p >= 1) {
        if (flightIntervalRef.current) clearInterval(flightIntervalRef.current);

        // 3. Arrow impacts the heart!
        setStage('scene1_pierced');
        sound.playArrowThud();
        setHeartShock(1.25);
        setTimeout(() => setHeartShock(1), 320);

        // Damped harmonic vibration of the arrow embedded in heart
        const vibeStart = Date.now();
        const vibeTimer = setInterval(() => {
          const el = (Date.now() - vibeStart) / 1000;
          if (el > 0.8) {
            clearInterval(vibeTimer);
            setArrowVibe(0);
          } else {
            // A * e^(-lambda * t) * cos(omega * t)
            const amp = 14 * Math.exp(-4.2 * el) * Math.cos(30 * el);
            setArrowVibe(amp);
          }
        }, 16);

        // 4. Exactly 1-second pause on the pierced heart!
        stageTimerRef.current = setTimeout(() => {
          setStage('scene1_exit_flight');
          sound.playArrowWhistle();

          // 5. Transition to Scene 2 after 500ms
          stageTimerRef.current = setTimeout(() => {
            setStage('scene2_incoming_flight');
            setScene2FlightP(0);

            // 6. Arrow flies across Scene 2 in slow motion towards the person (1200ms)
            const s2Start = Date.now();
            const s2Duration = 1200;

            const s2Timer = setInterval(() => {
              const now2 = Date.now();
              const p2 = Math.min(1, (now2 - s2Start) / s2Duration);
              setScene2FlightP(p2);

              if (p2 >= 1) {
                clearInterval(s2Timer);

                // 7. Arrow hits person's chest!
                sound.playArrowThud();
                setStage('scene2_hand_to_heart');

                // 8. Person moves right hand to heart (450ms)
                const handStart = Date.now();
                const handTimer = setInterval(() => {
                  const hp = Math.min(1, (Date.now() - handStart) / 450);
                  setHandProgress(1 - Math.pow(1 - hp, 3)); // easeOutCubic

                  if (hp >= 1) {
                    clearInterval(handTimer);

                    // 9. Eyes pop out of sockets with cartoon spring physics!
                    setStage('scene2_eyes_popping');
                    sound.playCartoonBoing();
                    sound.playHeartbeatPulse();

                    const eyeStart = Date.now();
                    const eyeTimer = setInterval(() => {
                      const ep = (Date.now() - eyeStart) / 1000;
                      if (ep > 1.3) {
                        clearInterval(eyeTimer);
                        setEyePopProgress(1);
                        setStage('scene2_smitten');

                        // Post pop-up: Rapid fast heartbeat audio loop
                        if (fastHeartbeatRef.current) clearInterval(fastHeartbeatRef.current);
                        fastHeartbeatRef.current = setInterval(() => {
                          sound.playHeartbeatPulse();
                        }, 400);
                      } else {
                        // Spring with overshoot
                        const spr = 1 - Math.exp(-3.5 * ep) * Math.cos(13 * ep);
                        setEyePopProgress(Math.max(0, spr));
                      }
                    }, 16);
                  }
                }, 16);
              }
            }, 16);
          }, 500);
        }, 1000); // 1-second pause
      }
    }, 16);
  };

  // Reset & Replay
  const handleReplay = useCallback(() => {
    if (stageTimerRef.current) clearTimeout(stageTimerRef.current);
    if (flightIntervalRef.current) clearInterval(flightIntervalRef.current);
    if (fastHeartbeatRef.current) clearInterval(fastHeartbeatRef.current);
    sound.playPop();
    setStage('scene1_idle');
    setFlightP(0);
    setScene2FlightP(0);
    setArrowVibe(0);
    setEyePopProgress(0);
    setHandProgress(0);
    setHeartShock(1);
  }, []);

  // Mathematical variables derived from time
  const cupidHoverY = Math.sin(time * 2.2) * 9;
  const cupidTilt = Math.cos(time * 2.2) * 2.5;
  const wingAngle = Math.sin(time * 11) * 24;
  const idleHeartScale = (1 + Math.sin(time * 3.5) * 0.05 + Math.sin(time * 7) * 0.02) * heartShock;

  // Scene 1 Coordinates (in a 1000 x 600 coordinate viewBox)
  const cupidX = 200;
  const cupidY = 170 + cupidHoverY;
  const bowNockX = cupidX + 42;
  const bowNockY = cupidY + 28;
  const heartCenterX = 700;
  const heartCenterY = 380;

  // Trajectory vector from Cupid's bow to Heart center
  const deltaX = heartCenterX - bowNockX; // 458
  const deltaY = heartCenterY - bowNockY; // ~182
  const trajectoryAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // ~21.7 degrees

  // Scene 1 Slow-Mo Arrow Position
  const s1ArrowX = bowNockX + deltaX * flightP;
  // Subtle aerodynamic arc in flight
  const s1ArrowY = bowNockY + deltaY * flightP - Math.sin(flightP * Math.PI) * 32;
  // Dynamic tangent angle during flight arc
  const arcDerivY = deltaY - Math.cos(flightP * Math.PI) * 32 * Math.PI;
  const s1ArrowAngle = (Math.atan2(arcDerivY, deltaX) * 180) / Math.PI;

  // Scene 2 Arrow Flight Coordinates (Targeting person's heart at x=520, y=280)
  const s2StartX = 80;
  const s2StartY = 110;
  const personHeartX = 525;
  const personHeartY = 285;
  const s2DeltaX = personHeartX - s2StartX;
  const s2DeltaY = personHeartY - s2StartY;
  const s2Angle = (Math.atan2(s2DeltaY, s2DeltaX) * 180) / Math.PI; // ~21.4 degrees

  const s2CurrentArrowX = s2StartX + s2DeltaX * scene2FlightP;
  const s2CurrentArrowY = s2StartY + s2DeltaY * scene2FlightP - Math.sin(scene2FlightP * Math.PI) * 22;
  const s2ArcDerivY = s2DeltaY - Math.cos(scene2FlightP * Math.PI) * 22 * Math.PI;
  const s2CurrentAngle = (Math.atan2(s2ArcDerivY, s2DeltaX) * 180) / Math.PI;

  // Scene 2 Active check
  const isScene2Active = 
    stage === 'scene2_incoming_flight' || 
    stage === 'scene2_hand_to_heart' || 
    stage === 'scene2_eyes_popping' || 
    stage === 'scene2_smitten';

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#18081f] via-[#2a0d2e] to-[#0c0410] text-white overflow-hidden select-none font-sans">
      {/* Ambient background glow & stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-rose-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        {/* Floating dust motes */}
        {Array.from({ length: 26 }).map((_, i) => {
          const x = (i * 43) % 100;
          const y = (i * 79 + time * 6) % 100;
          const size = (i % 3) + 1.5;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-pink-200/40"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.2 + (Math.sin(time + i) + 1) * 0.25,
              }}
            />
          );
        })}
      </div>

      {/* Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/10 backdrop-blur-md bg-black/30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-neutral-200 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gallery</span>
        </button>

        <div className="flex items-center gap-2 text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <h1 className="text-sm sm:text-base font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Cupid&apos;s Strike & Lovestruck Reaction
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {isScene2Active && (
            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/25 hover:bg-rose-500/35 border border-rose-400/40 text-rose-200 text-xs font-semibold transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Replay</span>
            </button>
          )}

          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-300 transition-all active:scale-95"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-pink-400" />}
          </button>
        </div>
      </header>

      {/* Viewport & Sliding Track Container */}
      <main className="relative w-full h-[calc(100vh-62px)] overflow-hidden">
        <div
          className="w-full h-[200%] flex flex-col transition-transform duration-1000 ease-in-out"
          style={{
            transform: isScene2Active ? 'translateY(-50%)' : 'translateY(0%)',
          }}
        >
          {/* ========================================================================= */}
          {/* SCENE 1: CUPID FAR TOP-LEFT AIMING DIAGONALLY AT GLOWING HEART (LOWER-RIGHT)*/}
          {/* ========================================================================= */}
          <section className="relative w-full h-1/2 flex flex-col items-center justify-center p-2 sm:p-4">
            {/* Scene 1 Badge */}
            <div className="absolute top-3 sm:top-5 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs font-semibold tracking-wider uppercase shadow-lg backdrop-blur-sm z-20">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-current animate-pulse" />
              <span>Scene 1: Cupid&apos;s Bow & Glowing Heart</span>
            </div>

            {/* Responsive Shared SVG Canvas for Scene 1 (1000 x 600) */}
            <div className="relative w-full max-w-5xl h-[82vh] max-h-[580px] select-none">
              <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible">
                <defs>
                  {/* Halo Gradient */}
                  <linearGradient id="s1Halo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>

                  {/* Skin Gradient */}
                  <linearGradient id="s1Skin" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="100%" stopColor="#fdba74" />
                  </linearGradient>

                  {/* Wing Gradient */}
                  <linearGradient id="s1Wing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor="#fce7f3" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>

                  {/* Golden Bow Gradient */}
                  <linearGradient id="s1Bow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>

                  {/* Arrow Gold Gradient */}
                  <linearGradient id="s1ArrowGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>

                  {/* Heart Gradient */}
                  <radialGradient id="s1HeartGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ff4d6d" />
                    <stop offset="40%" stopColor="#e11d48" />
                    <stop offset="85%" stopColor="#9f1239" />
                    <stop offset="100%" stopColor="#4c0519" />
                  </radialGradient>

                  {/* Arrow glow filter */}
                  <filter id="arrowGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle Aiming Trajectory Guide Line (Idle only) */}
                {stage === 'scene1_idle' && (
                  <line
                    x1={bowNockX}
                    y1={bowNockY}
                    x2={heartCenterX}
                    y2={heartCenterY}
                    stroke="#f472b6"
                    strokeWidth="1.2"
                    strokeDasharray="6 8"
                    opacity="0.3"
                  />
                )}

                {/* ------------------------------------------------------------- */}
                {/* 1. PROCEDURAL CUPID (Far Top-Left, aimed down at heart)        */}
                {/* ------------------------------------------------------------- */}
                <g transform={`translate(${cupidX}, ${cupidY}) rotate(${cupidTilt})`}>
                  {/* Left Feathered Wing */}
                  <g transform={`translate(-20, -10) rotate(${-wingAngle})`}>
                    <path
                      d="M 0 0 C -30 -30, -55 -20, -50 15 C -47 30, -30 35, -17 25 C -27 38, -17 48, -5 40 C -13 50, 3 55, 10 40 Z"
                      fill="url(#s1Wing)"
                      stroke="#fbcfe8"
                      strokeWidth="1.5"
                      filter="drop-shadow(0 2px 8px rgba(244,114,182,0.4))"
                    />
                  </g>

                  {/* Right Feathered Wing */}
                  <g transform={`translate(20, -10) rotate(${wingAngle})`}>
                    <path
                      d="M 0 0 C 30 -30, 55 -20, 50 15 C 47 30, 30 35, 17 25 C 27 38, 17 48, 5 40 C 13 50, -3 55, -10 40 Z"
                      fill="url(#s1Wing)"
                      stroke="#fbcfe8"
                      strokeWidth="1.5"
                      filter="drop-shadow(0 2px 8px rgba(244,114,182,0.4))"
                    />
                  </g>

                  {/* Golden Halo */}
                  <ellipse
                    cx="0"
                    cy="-60"
                    rx="22"
                    ry="6.5"
                    fill="none"
                    stroke="url(#s1Halo)"
                    strokeWidth="3.2"
                    filter="drop-shadow(0 0 8px #fde047)"
                  />

                  {/* Cupid Body & Toga */}
                  <ellipse cx="0" cy="10" rx="20" ry="24" fill="url(#s1Skin)" />
                  <path d="M -18 12 C -8 6, 12 6, 20 12 C 22 26, -20 26, -18 12 Z" fill="#ffffff" opacity="0.95" />

                  {/* Legs */}
                  <ellipse cx="-10" cy="34" rx="6" ry="11" fill="url(#s1Skin)" />
                  <ellipse cx="10" cy="34" rx="6" ry="11" fill="url(#s1Skin)" />

                  {/* Cupid Head */}
                  <circle cx="0" cy="-32" r="22" fill="url(#s1Skin)" />
                  {/* Golden Hair Curls */}
                  <circle cx="-14" cy="-48" r="8" fill="#f59e0b" />
                  <circle cx="0" cy="-51" r="9" fill="#fbbf24" />
                  <circle cx="14" cy="-48" r="8" fill="#f59e0b" />
                  <circle cx="-20" cy="-38" r="6" fill="#f59e0b" />
                  <circle cx="20" cy="-38" r="6" fill="#f59e0b" />

                  {/* Eyes looking directly down along the trajectory! */}
                  <ellipse cx="-7" cy="-31" rx="3" ry="4" fill="#1e1b4b" />
                  <ellipse cx="7" cy="-31" rx="3" ry="4" fill="#1e1b4b" />
                  <circle cx="-6" cy="-32" r="1.2" fill="#ffffff" />
                  <circle cx="8" cy="-32" r="1.2" fill="#ffffff" />

                  {/* Cheeks & Smile */}
                  <ellipse cx="-12" cy="-24" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.45" />
                  <ellipse cx="12" cy="-24" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.45" />
                  <path d="M -5 -21 Q 0 -17 5 -21" stroke="#991b1b" strokeWidth="1.6" strokeLinecap="round" fill="none" />

                  {/* ----------------------------------------------------------- */}
                  {/* CUPID'S BOW & ARROW - PERFECTLY ROTATED TOWARDS HEART!       */}
                  {/* ----------------------------------------------------------- */}
                  <g transform={`translate(42, 28) rotate(${trajectoryAngle - cupidTilt})`}>
                    {/* Left Bow Arm holding the bow */}
                    <path d="M -30 -15 C -20 -10, -10 -5, 0 0" stroke="url(#s1Skin)" strokeWidth="6" strokeLinecap="round" fill="none" />

                    {/* The Recurve Bow (Curved arc perpendicular to firing line) */}
                    <path
                      d="M -6 -48 Q 28 0 -6 48"
                      stroke="url(#s1Bow)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      filter="drop-shadow(0 0 6px rgba(250,204,21,0.7))"
                    />

                    {/* Bowstring */}
                    <line
                      x1="-6"
                      y1="-48"
                      x2={stage === 'scene1_idle' ? '-22' : '-6'}
                      y2="0"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                    <line
                      x1={stage === 'scene1_idle' ? '-22' : '-6'}
                      y1="0"
                      x2="-6"
                      y2="48"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      opacity="0.9"
                    />

                    {/* Right Arm drawing the string */}
                    <path
                      d={stage === 'scene1_idle' ? 'M -40 10 C -30 5, -24 2, -22 0' : 'M -40 10 C -25 5, -15 2, -6 0'}
                      stroke="url(#s1Skin)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* ARROW RESTING ON BOWSTRING (Only visible when IDLE) */}
                    {stage === 'scene1_idle' && (
                      <g>
                        {/* Shaft aligned straight along x-axis (firing vector) */}
                        <line
                          x1="-22"
                          y1="0"
                          x2="40"
                          y2="0"
                          stroke="url(#s1ArrowGold)"
                          strokeWidth="3"
                          filter="url(#arrowGlow)"
                        />
                        {/* Golden/Rose Arrowhead */}
                        <polygon
                          points="46,0 36,-6 40,0 36,6"
                          fill="#f43f5e"
                          stroke="#fde047"
                          strokeWidth="1"
                        />
                        {/* Fletchings */}
                        <path d="M -20 0 L -28 -7 M -15 0 L -23 -7" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                        <path d="M -20 0 L -28 7 M -15 0 L -23 7" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    )}
                  </g>
                </g>

                {/* ------------------------------------------------------------- */}
                {/* 2. SLOW MOTION ARROW FLIGHT ACROSS SCENE 1                    */}
                {/* ------------------------------------------------------------- */}
                {stage === 'scene1_slowmo_flight' && (
                  <g transform={`translate(${s1ArrowX}, ${s1ArrowY}) rotate(${s1ArrowAngle})`}>
                    {/* Glowing golden/pink trailing particle wake */}
                    <line
                      x1="-70"
                      y1="0"
                      x2="-25"
                      y2="0"
                      stroke="#fb7185"
                      strokeWidth="4"
                      opacity="0.4"
                      strokeLinecap="round"
                      filter="url(#arrowGlow)"
                    />
                    <line
                      x1="-40"
                      y1="0"
                      x2="-10"
                      y2="0"
                      stroke="#fde047"
                      strokeWidth="2.5"
                      opacity="0.8"
                    />

                    {/* The Flying Arrow */}
                    <line
                      x1="-30"
                      y1="0"
                      x2="32"
                      y2="0"
                      stroke="url(#s1ArrowGold)"
                      strokeWidth="3.5"
                      filter="url(#arrowGlow)"
                    />
                    {/* Arrowhead */}
                    <polygon
                      points="40,0 28,-7 33,0 28,7"
                      fill="#f43f5e"
                      stroke="#fde047"
                      strokeWidth="1.5"
                      filter="drop-shadow(0 0 6px #f43f5e)"
                    />
                    {/* Feathers */}
                    <path d="M -26 0 L -36 -8 M -19 0 L -29 -8" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M -26 0 L -36 8 M -19 0 L -29 8" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 3. GLOWING RED HEART & 2D PIERCING CROSSING EFFECT            */}
                {/* ------------------------------------------------------------- */}
                <g transform={`translate(${heartCenterX}, ${heartCenterY})`}>
                  {/* Concentric ambient glow */}
                  <circle cx="0" cy="0" r="110" fill="url(#s1HeartGrad)" opacity="0.15" filter="url(#arrowGlow)" />
                  <circle cx="0" cy="0" r="75" fill="#ef4444" opacity="0.25" filter="url(#arrowGlow)" />

                  {/* ----------------------------------------------------------- */}
                  {/* 2D CROSSING ARROW: ENTRY END (Fletchings on Top-Left side)  */}
                  {/* ----------------------------------------------------------- */}
                  {(stage === 'scene1_pierced' || stage === 'scene1_exit_flight') && (
                    <g transform={`rotate(${trajectoryAngle + arrowVibe})`}>
                      {/* Entry shaft protruding out from top-left */}
                      <line
                        x1="-105"
                        y1="0"
                        x2="-38"
                        y2="0"
                        stroke="url(#s1ArrowGold)"
                        strokeWidth="4"
                        filter="url(#arrowGlow)"
                      />
                      {/* Vibrating Fletchings */}
                      <path d="M -95 0 L -107 -9 M -87 0 L -99 -9" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                      <path d="M -95 0 L -107 9 M -87 0 L -99 9" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                      {/* Entry impact flash */}
                      <circle cx="-38" cy="0" r="7" fill="#fde047" opacity="0.8" className="animate-ping" />
                    </g>
                  )}

                  {/* ----------------------------------------------------------- */}
                  {/* THE 2D GLOWING HEART SHAPE                                  */}
                  {/* ----------------------------------------------------------- */}
                  <g
                    onClick={handleHeartClick}
                    className={stage === 'scene1_idle' ? 'cursor-pointer' : ''}
                    transform={`scale(${stage === 'scene1_idle' ? idleHeartScale : heartShock}) translate(-80, -75)`}
                  >
                    <path
                      d="M 80 135 C 20 90, 0 50, 20 22 C 38 -5, 70 5, 80 32 C 90 5, 122 -5, 140 22 C 160 50, 140 90, 80 135 Z"
                      fill="url(#s1HeartGrad)"
                      stroke="#fda4af"
                      strokeWidth="2.5"
                      filter="drop-shadow(0 0 25px rgba(239,68,68,0.85))"
                    />
                    {/* Heart gleam highlight */}
                    <path d="M 32 28 C 44 14, 62 20, 68 34 C 64 36, 40 38, 32 28 Z" fill="#ffffff" opacity="0.45" />
                  </g>

                  {/* ----------------------------------------------------------- */}
                  {/* 2D CROSSING ARROW: EXIT END (Tip protruding on Bottom-Right)*/}
                  {/* ----------------------------------------------------------- */}
                  {(stage === 'scene1_pierced' || stage === 'scene1_exit_flight') && (
                    <g transform={`rotate(${trajectoryAngle + arrowVibe * 0.7})`}>
                      {/* Exit shaft emerging past the heart contour */}
                      <line
                        x1="38"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke="url(#s1ArrowGold)"
                        strokeWidth="4"
                        filter="url(#arrowGlow)"
                      />
                      {/* Arrowhead protruding past the heart */}
                      <polygon
                        points="110,0 96,-7 102,0 96,7"
                        fill="#f43f5e"
                        stroke="#fde047"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 0 6px #f43f5e)"
                      />
                      {/* Exit impact flash */}
                      <circle cx="38" cy="0" r="7" fill="#fde047" opacity="0.8" className="animate-ping" />
                    </g>
                  )}
                </g>

                {/* Arrow Accelerating toward Scene 2 */}
                {stage === 'scene1_exit_flight' && (
                  <g transform={`translate(${heartCenterX + 120}, ${heartCenterY + 45}) rotate(${trajectoryAngle})`} className="animate-pulse">
                    <line x1="-30" y1="0" x2="60" y2="0" stroke="#fde047" strokeWidth="4" filter="url(#arrowGlow)" />
                    <polygon points="70,0 56,-7 62,0 56,7" fill="#f43f5e" stroke="#fde047" />
                  </g>
                )}
              </svg>

              {/* "CLICK ME" PROMPT / STATUS BUTTON */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-center">
                {stage === 'scene1_idle' ? (
                  <button
                    onClick={handleHeartClick}
                    className="cursor-pointer inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-rose-500/40 transition-all hover:scale-105 active:scale-95 border border-pink-300/30"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                    <span>Click me</span>
                  </button>
                ) : stage === 'scene1_slowmo_flight' ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-950/80 border border-rose-500/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-lg">
                    <span className="animate-spin text-base">🏹</span>
                    <span>Slow motion arrow flight...</span>
                  </div>
                ) : stage === 'scene1_pierced' ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs sm:text-sm font-semibold shadow-lg animate-pulse">
                    <span>💘 Pierced! Crossing effect (1 sec pause)...</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-950/80 border border-rose-500/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-lg animate-bounce">
                    <span>🚀 Arrow flying to Scene 2...</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SCENE 2: ARROW FLYING TO PERSON, HIT CHEST, HAND TO HEART & EYE POP!      */}
          {/* ========================================================================= */}
          <section className="relative w-full h-1/2 flex flex-col items-center justify-center p-2 sm:p-4">
            {/* Scene 2 Badge */}
            <div className="absolute top-3 sm:top-5 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-200 text-xs font-semibold tracking-wider uppercase shadow-lg backdrop-blur-sm z-20">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
              <span>Scene 2: Lovestruck Person & Cartoon Eye Pop</span>
            </div>

            {/* Responsive Shared SVG Canvas for Scene 2 (1000 x 600) */}
            <div className="relative w-full max-w-5xl h-[82vh] max-h-[580px] select-none flex flex-col items-center justify-center">
              <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible">
                <defs>
                  {/* Person Skin Gradient */}
                  <linearGradient id="s2Skin" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="100%" stopColor="#fba36e" />
                  </linearGradient>

                  {/* Person Shirt Gradient */}
                  <linearGradient id="s2Shirt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>

                  {/* Eye Stalk Gradient */}
                  <linearGradient id="s2Stalk" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="50%" stopColor="#fecdd3" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                {/* ------------------------------------------------------------- */}
                {/* 1. ARROW INCOMING FLIGHT (Flying across Scene 2 to person)    */}
                {/* ------------------------------------------------------------- */}
                {stage === 'scene2_incoming_flight' && (
                  <g transform={`translate(${s2CurrentArrowX}, ${s2CurrentArrowY}) rotate(${s2CurrentAngle})`}>
                    {/* Glowing Trail */}
                    <line x1="-60" y1="0" x2="-20" y2="0" stroke="#f472b6" strokeWidth="4" opacity="0.4" strokeLinecap="round" />
                    <line x1="-35" y1="0" x2="-10" y2="0" stroke="#fde047" strokeWidth="2.5" opacity="0.8" />

                    {/* Arrow Body */}
                    <line x1="-25" y1="0" x2="30" y2="0" stroke="#f59e0b" strokeWidth="3.5" filter="url(#arrowGlow)" />
                    <polygon points="38,0 26,-7 31,0 26,7" fill="#f43f5e" stroke="#fde047" strokeWidth="1.5" />
                    <path d="M -22 0 L -32 -8 M -16 0 L -26 -8" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M -22 0 L -32 8 M -16 0 L -26 8" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 2. THE 2D PERSON (Standing centered at x=540, y=280)          */}
                {/* ------------------------------------------------------------- */}
                <g transform="translate(540, 200)">
                  {/* Hair Back */}
                  <path d="M -50 -50 C -70 -120, 70 -120, 50 -50 C 70 -10, -70 -10, -50 -50 Z" fill="#451a03" />

                  {/* Neck */}
                  <rect x="-14" y="20" width="28" height="30" rx="6" fill="url(#s2Skin)" />

                  {/* Torso / Shirt */}
                  <path
                    d="M -60 45 C -60 40, 60 40, 60 45 L 75 190 C 75 196, -75 196, -75 190 Z"
                    fill="url(#s2Shirt)"
                    stroke="#0369a1"
                    strokeWidth="2.5"
                  />

                  {/* Left Arm (Relaxed at side) */}
                  <path
                    d="M -60 55 C -85 90, -90 140, -85 175"
                    stroke="url(#s2Shirt)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="-85" cy="180" r="9" fill="url(#s2Skin)" />

                  {/* ----------------------------------------------------------- */}
                  {/* ARROW EMBEDDED IN CHEST (Visible once hit)                  */}
                  {/* ----------------------------------------------------------- */}
                  {(stage === 'scene2_hand_to_heart' ||
                    stage === 'scene2_eyes_popping' ||
                    stage === 'scene2_smitten') && (
                    <g transform={`translate(-15, 85) rotate(${s2Angle - 180})`}>
                      {/* Protruding golden arrow shaft */}
                      <line x1="0" y1="0" x2="60" y2="0" stroke="#f59e0b" strokeWidth="4" filter="url(#arrowGlow)" />
                      {/* Feathers */}
                      <path d="M 50 0 L 62 -8 M 42 0 L 54 -8" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 50 0 L 62 8 M 42 0 L 54 8" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                      {/* Heart impact flash */}
                      <circle cx="0" cy="0" r="12" fill="#f43f5e" opacity="0.85" className="animate-pulse" />
                      <circle cx="0" cy="0" r="6" fill="#fde047" />
                    </g>
                  )}

                  {/* ----------------------------------------------------------- */}
                  {/* RIGHT ARM MOVING TO HEART (Math Joint Interpolation)         */}
                  {/* ----------------------------------------------------------- */}
                  {(() => {
                    // When handProgress = 0: Arm is relaxed at right side
                    // When handProgress = 1: Arm curves smoothly onto chest over heart (-15, 85)
                    const elbowX = 85 - handProgress * 32;
                    const elbowY = 110 - handProgress * 20;
                    const wristX = 85 - handProgress * 95;
                    const wristY = 175 - handProgress * 88;

                    return (
                      <g>
                        <path
                          d={`M 60 55 Q ${elbowX} ${elbowY} ${wristX} ${wristY}`}
                          stroke="url(#s2Shirt)"
                          strokeWidth="16"
                          strokeLinecap="round"
                          fill="none"
                        />
                        {/* Hand clutching heart */}
                        <ellipse
                          cx={wristX}
                          cy={wristY}
                          rx="10"
                          ry="9"
                          fill="url(#s2Skin)"
                          stroke="#fba36e"
                          strokeWidth="2"
                        />
                        {/* Fingers gripping chest */}
                        {handProgress > 0.5 && (
                          <path
                            d={`M ${wristX - 6} ${wristY - 5} Q ${wristX - 2} ${wristY + 7} ${wristX + 6} ${wristY + 3}`}
                            stroke="#ea580c"
                            strokeWidth="2"
                            fill="none"
                          />
                        )}
                      </g>
                    );
                  })()}

                  {/* Head & Ears */}
                  <circle cx="0" cy="-25" r="44" fill="url(#s2Skin)" />
                  <circle cx="-45" cy="-25" r="9" fill="url(#s2Skin)" />
                  <circle cx="45" cy="-25" r="9" fill="url(#s2Skin)" />

                  {/* Front Hair */}
                  <path
                    d="M -44 -45 C -25 -80, 25 -80, 44 -45 C 32 -58, 12 -65, -8 -58 C -22 -62, -35 -52, -44 -45 Z"
                    fill="#451a03"
                  />

                  {/* Cheeks blush */}
                  {(stage === 'scene2_hand_to_heart' ||
                    stage === 'scene2_eyes_popping' ||
                    stage === 'scene2_smitten') && (
                    <>
                      <ellipse cx="-26" cy="-10" rx="10" ry="6" fill="#f43f5e" opacity="0.65" className="animate-pulse" />
                      <ellipse cx="26" cy="-10" rx="10" ry="6" fill="#f43f5e" opacity="0.65" className="animate-pulse" />
                    </>
                  )}

                  {/* Mouth */}
                  {eyePopProgress > 0.2 ? (
                    <ellipse cx="0" cy="2" rx="9" ry="12" fill="#991b1b" stroke="#f43f5e" strokeWidth="2" />
                  ) : (
                    <path d="M -10 0 Q 0 6 10 0" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  )}

                  {/* ----------------------------------------------------------- */}
                  {/* EYE SOCKETS & CARTOON EYE POP (Tex Avery Spring Stalks)     */}
                  {/* ----------------------------------------------------------- */}
                  {/* Left Socket Rim */}
                  <circle cx="-18" cy="-30" r="11" fill="#292524" stroke="#fba36e" strokeWidth="2" />
                  {/* Right Socket Rim */}
                  <circle cx="18" cy="-30" r="11" fill="#292524" stroke="#fba36e" strokeWidth="2" />

                  {eyePopProgress <= 0.05 ? (
                    /* Resting Eyes */
                    <g>
                      <circle cx="-18" cy="-30" r="10" fill="#ffffff" />
                      <circle cx="-18" cy="-30" r="5.5" fill="#1e1b4b" />
                      <circle cx="-20" cy="-32" r="1.8" fill="#ffffff" />

                      <circle cx="18" cy="-30" r="10" fill="#ffffff" />
                      <circle cx="18" cy="-30" r="5.5" fill="#1e1b4b" />
                      <circle cx="16" cy="-32" r="1.8" fill="#ffffff" />
                    </g>
                  ) : (
                    /* TWO FULL POP-UP HEARTS EXTENDING FORWARD ON SPRINGY STALKS, BEATING FAST! */
                    (() => {
                      const ext = eyePopProgress * 72;
                      const eyeScale = 1 + eyePopProgress * 0.85;

                      // Fast double-beat heartbeat pulse post pop-up (pulsing fast at ~145 BPM)
                      const beatCycle = (time * 19) % (Math.PI * 2);
                      const fastThump = Math.sin(beatCycle) > 0.05 
                        ? Math.pow(Math.sin(beatCycle), 2) * 0.38 
                        : Math.sin(beatCycle * 2) * 0.1;
                      const currentHeartScale = eyeScale * (eyePopProgress >= 0.7 ? (1 + Math.max(0, fastThump)) : 1);

                      const leftStalkX = -18 - ext * 0.55;
                      const leftStalkY = -30 - ext * 0.75;

                      const rightStalkX = 18 + ext * 0.55;
                      const rightStalkY = -30 - ext * 0.75;

                      return (
                        <g>
                          {/* Left Eye Stalk */}
                          <path
                            d={`M -18 -30 Q ${-18 - ext * 0.15} ${-30 - ext * 0.95} ${leftStalkX} ${leftStalkY}`}
                            stroke="url(#s2Stalk)"
                            strokeWidth="11"
                            strokeLinecap="round"
                            fill="none"
                          />
                          {/* Vibration lines */}
                          <line x1={leftStalkX - 10} y1={leftStalkY - 18} x2={leftStalkX - 3} y2={leftStalkY - 10} stroke="#fde047" strokeWidth="2.5" />

                          {/* Right Eye Stalk */}
                          <path
                            d={`M 18 -30 Q ${18 + ext * 0.15} ${-30 - ext * 0.95} ${rightStalkX} ${rightStalkY}`}
                            stroke="url(#s2Stalk)"
                            strokeWidth="11"
                            strokeLinecap="round"
                            fill="none"
                          />
                          {/* Vibration lines */}
                          <line x1={rightStalkX + 10} y1={rightStalkY - 18} x2={rightStalkX + 3} y2={rightStalkY - 10} stroke="#fde047" strokeWidth="2.5" />

                          {/* Left Full Heart Eye (No borders, pure vibrant beating heart) */}
                          <g transform={`translate(${leftStalkX}, ${leftStalkY}) scale(${currentHeartScale})`}>
                            {/* Ambient heart glow */}
                            <circle cx="0" cy="-2" r="24" fill="#f43f5e" opacity="0.3" filter="url(#arrowGlow)" />
                            {/* Full Heart Shape (No borders) */}
                            <path
                              d="M 0 16 C -20 2, -26 -16, -12 -22 C 0 -22, 0 -10, 0 -7 C 0 -10, 0 -22, 12 -22 C 26 -16, 20 2, 0 16 Z"
                              fill="url(#s1HeartGrad)"
                              filter="drop-shadow(0 0 14px rgba(239,68,68,0.95))"
                            />
                            {/* Glossy highlight sheen on left lobe */}
                            <ellipse cx="-5.5" cy="-14" rx="4" ry="2.2" fill="#ffffff" opacity="0.7" transform="rotate(-20, -5.5, -14)" />
                          </g>

                          {/* Right Full Heart Eye (No borders, pure vibrant beating heart) */}
                          <g transform={`translate(${rightStalkX}, ${rightStalkY}) scale(${currentHeartScale})`}>
                            {/* Ambient heart glow */}
                            <circle cx="0" cy="-2" r="24" fill="#f43f5e" opacity="0.3" filter="url(#arrowGlow)" />
                            {/* Full Heart Shape (No borders) */}
                            <path
                              d="M 0 16 C -20 2, -26 -16, -12 -22 C 0 -22, 0 -10, 0 -7 C 0 -10, 0 -22, 12 -22 C 26 -16, 20 2, 0 16 Z"
                              fill="url(#s1HeartGrad)"
                              filter="drop-shadow(0 0 14px rgba(239,68,68,0.95))"
                            />
                            {/* Glossy highlight sheen on left lobe */}
                            <ellipse cx="-5.5" cy="-14" rx="4" ry="2.2" fill="#ffffff" opacity="0.7" transform="rotate(-20, -5.5, -14)" />
                          </g>
                        </g>
                      );
                    })()
                  )}

                  {/* Floating Love Hearts */}
                  {eyePopProgress > 0.35 && (
                    <g className="animate-bounce">
                      <path d="M -90 -40 C -96 -46, -98 -52, -94 -55 C -90 -55, -89 -53, -89 -51 C -89 -53, -88 -55, -84 -55 C -80 -52, -82 -46, -90 -40 Z" fill="#f43f5e" filter="url(#arrowGlow)" />
                      <path d="M 90 -50 C 84 -56, 82 -62, 86 -65 C 90 -65, 91 -63, 91 -61 C 91 -63, 92 -65, 96 -65 C 100 -62, 98 -56, 90 -50 Z" fill="#fb7185" filter="url(#arrowGlow)" />
                      <path d="M 0 -130 C -6 -136, -8 -142, -4 -145 C 0 -145, 1 -143, 1 -141 C 1 -143, 2 -145, 6 -145 C 10 -142, 8 -136, 0 -130 Z" fill="#f43f5e" filter="url(#arrowGlow)" />
                    </g>
                  )}
                </g>
              </svg>

              {/* Scene 2 Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-center">
                <div className="space-y-1">
                  <h2 className="text-base sm:text-xl font-display font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
                    Smitten in the Heart! 💘
                  </h2>
                  <p className="text-xs text-neutral-300 max-w-sm">
                    Right hand on heart, eyes popped out in classic cartoon lovestruck delight!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReplay}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-500/35 transition-all hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Replay Animation</span>
                  </button>

                  <button
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs sm:text-sm transition-all active:scale-95"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
