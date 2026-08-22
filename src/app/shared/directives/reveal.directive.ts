import { Directive, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

export type RevealDireccion = 'up' | 'left' | 'right' | 'none';

/**
 * Anima la entrada de un elemento cuando cruza el viewport (fade + desplazamiento
 * sutil con GSAP). No hace nada en SSR ni si el usuario pide `prefers-reduced-motion`.
 * Uso: `<div appReveal>` o `<div appReveal="left" [appRevealDelay]="0.1">`.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') direccion: RevealDireccion = 'up';
  @Input() appRevealDelay = 0;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = this.el.nativeElement;

    if (reducirMovimiento) {
      gsap.set(target, { clearProps: 'all' });
      return;
    }

    const offset = { up: { y: 24 }, left: { x: -24 }, right: { x: 24 }, none: {} }[this.direccion];
    gsap.set(target, { autoAlpha: 0, ...offset });

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          gsap.to(target, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            delay: this.appRevealDelay,
            ease: 'power2.out',
          });
          this.observer?.unobserve(target);
        }
      },
      { threshold: 0.15 },
    );
    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
