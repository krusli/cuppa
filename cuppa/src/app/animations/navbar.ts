import { trigger, style, animate, transition, state } from '@angular/animations';

// https://angularfirebase.com/lessons/bootstrap-4-collapsable-navbar-work-with-angular/
export const navbarAnimation = trigger('collapse', [
  state('open', style({
    opacity: '1',
    display: 'block',
    // transform: 'translate3d(0, 0, 0)'
  })),
  state('closed', style({
    opacity: '0',
    display: 'none',
    // transform: 'translate3d(0, -100%, 0)'
  })),
  transition('closed => open', animate('300ms ease-in')),
  transition('open => closed', animate('400ms ease-out'))
]);
