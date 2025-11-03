import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appGsapParallax]',
  standalone: true,
})
export class GsapParallaxDirective implements OnInit, OnDestroy {
  @Input() y: number = 120;                
  @Input() start: string = 'top bottom';    
  @Input() end: string = 'bottom top';      
  @Input() scrub: boolean | number = 0.6;   

  private ctx?: gsap.Context;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    host.style.willChange = 'transform';

    this.ctx = gsap.context(() => {
      gsap.fromTo(
        host,
        { y: -this.y / 2 },
        {
          y: this.y / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: host,
            start: this.start,
            end: this.end,
            scrub: this.scrub,
          },
        }
      );
    }, host);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}