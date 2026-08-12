import React, { useEffect, useRef } from 'react';

export default function Mascot() {
  const containerRef = useRef(null);
  const isTypingRef = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Reliable initialization polling for CDN-loaded anime.js
    const initAnime = () => {
      if (!window.anime) {
        setTimeout(initAnime, 50);
        return;
      }
      
      // Start breathing animation on the container
      window.anime({
        targets: containerRef.current,
        translateY: [0, -3, 0],
        duration: 2200,
        loop: true,
        easing: 'easeInOutSine'
      });

      // Ensure initial state
      window.anime.set('.typing-pose', { opacity: 0, translateY: 15 });
      window.anime.set('.idle-pose', { opacity: 1, translateY: 0 });
    };
    
    initAnime();

    const handleScroll = () => {
      if (!window.anime) return;

      const currentScrollY = window.scrollY;
      
      // Ignore scroll events if the scroll position hasn't changed
      if (currentScrollY === lastScrollY.current) return;
      
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      
      // Update last known scroll position
      lastScrollY.current = currentScrollY;

      // Only trigger if direction changed or state doesn't match
      if (isScrollingDown && !isTypingRef.current) {
        // Switch to typing pose
        isTypingRef.current = true;
        
        window.anime.remove('.typing-pose');
        window.anime.remove('.idle-pose');
        
        window.anime({
          targets: '.typing-pose',
          opacity: [0, 1],
          translateY: [15, 0],
          duration: 500,
          easing: 'easeOutQuad'
        });
        
        window.anime({
          targets: '.idle-pose',
          opacity: [1, 0],
          translateY: [0, 15],
          duration: 500,
          easing: 'easeOutQuad'
        });
        
      } else if (isScrollingUp && isTypingRef.current) {
        // Switch to idle pose
        isTypingRef.current = false;
        
        window.anime.remove('.typing-pose');
        window.anime.remove('.idle-pose');
        
        window.anime({
          targets: '.idle-pose',
          opacity: [0, 1],
          translateY: [15, 0],
          duration: 500,
          easing: 'easeOutQuad'
        });
        
        window.anime({
          targets: '.typing-pose',
          opacity: [1, 0],
          translateY: [0, 15],
          duration: 500,
          easing: 'easeOutQuad'
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed top-4 left-4 w-[100px] h-[100px] opacity-90 z-50 pointer-events-none hidden sm:block"
      ref={containerRef}
    >
      <div className="relative w-full h-full">
        <img 
          src="/assets/typing-pose.png" 
          alt="Mascot Typing" 
          className="typing-pose absolute bottom-0 right-0 w-full object-contain"
          style={{ opacity: 0 }}
        />
        <img 
          src="/assets/idle-pose.png" 
          alt="Mascot Idle" 
          className="idle-pose absolute bottom-0 right-0 w-full object-contain"
        />
      </div>
    </div>
  );
}
