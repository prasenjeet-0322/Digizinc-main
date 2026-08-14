import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashLoaderProps {
  onFinished: () => void;
}

const SplashLoader: React.FC<SplashLoaderProps> = ({ onFinished }) => {
  const [phase, setPhase] = useState<'loading' | 'splitting' | 'done'>('loading');

  // Lock body scroll during splash
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    // Loading animation plays for ~1.8s, then trigger split
    const loadTimer = setTimeout(() => {
      setPhase('splitting');
    }, 1800);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (phase === 'splitting') {
      // Give the split animation time to complete before unmounting
      const splitTimer = setTimeout(() => {
        setPhase('done');
        // Restore body scroll
        document.body.style.overflow = '';
        onFinished();
      }, 800);
      return () => clearTimeout(splitTimer);
    }
  }, [phase, onFinished]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <div className="fixed inset-0 z-[99999]">
          {/* Top Half */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[99999] flex items-end justify-center"
            initial={{ y: 0 }}
            animate={phase === 'splitting' ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Bottom Half */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[99999]"
            initial={{ y: 0 }}
            animate={phase === 'splitting' ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Centered Loader Content */}
          <motion.div
            className="absolute inset-0 z-[100000] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={phase === 'splitting' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <StyledWrapper>
              <div className="card">
                <div className="loader">
                  <p>loading</p>
                  <div className="words">
                    <span className="word">brands</span>
                    <span className="word">designs</span>
                    <span className="word">strategy</span>
                    <span className="word">creativity</span>
                    <span className="word">brands</span>
                  </div>
                </div>
              </div>
            </StyledWrapper>
          </motion.div>

          {/* Split line glow effect */}
          {phase === 'splitting' && (
            <motion.div
              className="absolute left-0 w-full h-[2px] bg-[#F23030] z-[100001] shadow-[0_0_30px_10px_rgba(242,48,48,0.5)]"
              style={{ top: '50%', translateY: '-50%' }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

const StyledWrapper = styled.div`
  .card {
    --bg-color: #0a0a0a;
    background-color: var(--bg-color);
    padding: 1rem 2rem;
    border-radius: 1.25rem;
  }
  .loader {
    color: rgb(124, 124, 124);
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 25px;
    box-sizing: content-box;
    height: 40px;
    padding: 10px 10px;
    display: flex;
    border-radius: 8px;
  }

  .words {
    overflow: hidden;
    position: relative;
  }
  .words::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      var(--bg-color) 10%,
      transparent 30%,
      transparent 70%,
      var(--bg-color) 90%
    );
    z-index: 20;
  }

  .word {
    display: block;
    height: 100%;
    padding-left: 6px;
    color: #F23030;
    animation: spin_4991 2s infinite;
  }

  @keyframes spin_4991 {
    10% {
      transform: translateY(-102%);
    }

    25% {
      transform: translateY(-100%);
    }

    35% {
      transform: translateY(-202%);
    }

    50% {
      transform: translateY(-200%);
    }

    60% {
      transform: translateY(-302%);
    }

    75% {
      transform: translateY(-300%);
    }

    85% {
      transform: translateY(-402%);
    }

    100% {
      transform: translateY(-400%);
    }
  }
`;

export default SplashLoader;
