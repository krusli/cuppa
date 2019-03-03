import { trigger, style, animate, transition } from '@angular/animations';

// https://github.com/krusli/krusli.me/blob/master/src/app/animations/animations.ts
export const enterLeaveAnimation = trigger(
  'enterAnimation', [
    transition(':enter', [
      style({ transform: 'translateY(-5%)', opacity: 0 }),
      animate('400ms', style({ transform: 'translateY(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate('400ms', style({ transform: 'translateY(5%)', opacity: 0 }))
    ])
  ]
);
