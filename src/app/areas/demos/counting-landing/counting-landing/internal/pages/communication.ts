import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { counterStore } from '../stores/counter';
import { ButtonReset } from './widgets/button-reset';
import { ButtonRound } from './widgets/button-round';

@Component({
  selector: 'app-counter-pages-communications',
  providers: [counterStore], // create a new instance of this service that's life is scoped to this component.
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, ButtonRound, RouterLink, RouterLinkActive, ButtonReset],
  template: `<app-ui-page title="communications">
    <div class="flex flex-row gap-4">
      <a
        routerLink="/counting"
        routerLinkActive="bg-yellow-200"
        class="link"
        [routerLinkActiveOptions]="{ exact: true }"
        >Go Back Home!</a
      >
      <a
        routerLink="/counting/old-skool"
        [routerLinkActive]="['bg-yellow-200', 'uppercase']"
        class="link"
        >Go To the old-skool version</a
      >
      <a routerLink="/counting/communications" routerLinkActive="bg-yellow-200" class="link"
        >Go To the communications version</a
      >
    </div>
    <div class="flex items-center justify-center">
      <app-counting-button-round
        [disabled]="store.current() === 0"
        label="-"
        intent="error"
        (click)="store.decrement()"
      />
      <span class="mx-2 text-2xl font-mono">{{ store.current() }}</span>
      <app-counting-button-round
        [disabled]="store.current() === 10"
        label="+"
        intent="success"
        (click)="store.increment()"
      />

      <app-counting-button-reset />
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class CommunicationPage {
  store = inject(counterStore);
}
