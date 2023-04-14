import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import DrawSVGPlugin from 'gsap/dist/DrawSVGPlugin';
import MorphSVGPlugin from 'gsap/dist/MorphSVGPlugin';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const registerEffect: gsap.RegisterEffect = gsap.registerEffect;

function gsapInit() {
  gsap.registerPlugin(CustomEase, ScrollToPlugin, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);
  gsap.defaults({ ease: 'power2.out', duration: 0.333 });
  gsap.config({ nullTargetWarn: false });

  CustomEase.create('ease01', '0.14, 1.00, 0.34, 1.00');
  CustomEase.create('ease02', ' 0.33, 0.00, 0.00, 1.0');

  registerEffect({
    name: 'fadeIn',
    extendTimeline: true,
    effect: (targets, config) => {
      return gsap.from(targets, {
        duration: config.duration,
        opacity: 0,
        y: config.y,
        delay: config.delay,
        stagger: config.stagger
      });
    },
    defaults: { duration: 0.667, y: 20, delay: 0, stagger: 0 }
  });
}

export default gsapInit;
