import { gsap } from 'gsap';

// Initialize GSAP animations - only for start screen
export const initGSAPAnimations = () => {
  // Set default ease
  gsap.defaults({ ease: "power2.out" });

  // Only animate start screen elements if they exist
  const startScreenElements = document.querySelectorAll('.start-screen-animate');
  if (startScreenElements.length > 0) {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      gsap.set(startScreenElements, { opacity: 0, y: 20 });
      gsap.to(startScreenElements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.1
      });
    });
  }
};

// Animate button click - keep this for all buttons
export const animateButtonClick = (element: HTMLElement) => {
  // Only animate if element exists and GSAP is available
  if (!element || !gsap) return;
  
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  });
};

// Keep these for potential future use but they won't be called automatically
export const animateModalEntrance = (element: HTMLElement) => {
  if (!element || !gsap) return;
  
  gsap.fromTo(element, 
    {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }
  );
};

export const animateModalExit = (element: HTMLElement, onComplete?: () => void) => {
  if (!element || !gsap) return;
  
  gsap.to(element, {
    opacity: 0,
    scale: 0.8,
    y: -50,
    duration: 0.3,
    ease: "power2.in",
    onComplete
  });
};