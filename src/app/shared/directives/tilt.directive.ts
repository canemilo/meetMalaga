import { Directive, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Inclinación 3D que sigue al puntero (perspective + rotateX/rotateY), con
 * sombra dinámica según el ángulo. Sin librerías: solo CSS transforms.
 * No hace nada en SSR, en dispositivos táctiles ni con `prefers-reduced-motion`.
 * Uso: `<a appTilt>` o `<a appTilt [appTiltMax]="10">`.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit, OnDestroy {
  @Input() appTiltMax = 8;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef<HTMLElement>);
  private frame = 0;
  private readonly unlisten: Array<() => void> = [];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;

    const target = this.el.nativeElement;

    const onEnter = () => {
      target.style.transition = 'none';
    };

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotY = (px - 0.5) * 2 * this.appTiltMax;
        const rotX = (0.5 - py) * 2 * this.appTiltMax;
        target.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        target.style.boxShadow = `${-rotY * 1.4}px ${rotX * 1.4 + 14}px 28px -16px rgba(16,34,43,.35)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(this.frame);
      target.style.transition = 'transform .5s ease, box-shadow .5s ease';
      target.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      target.style.boxShadow = '';
    };

    target.addEventListener('pointerenter', onEnter);
    target.addEventListener('pointermove', onMove);
    target.addEventListener('pointerleave', onLeave);
    this.unlisten.push(
      () => target.removeEventListener('pointerenter', onEnter),
      () => target.removeEventListener('pointermove', onMove),
      () => target.removeEventListener('pointerleave', onLeave),
    );
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    cancelAnimationFrame(this.frame);
    this.unlisten.forEach((fn) => fn());
  }
}
