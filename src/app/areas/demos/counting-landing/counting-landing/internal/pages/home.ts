import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { tasksStore } from '@ht/labs/lab1jeff/lab1-landing/internal/stores/tasks';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: ` <app-ui-page title="counting"> </app-ui-page> `,
  styles: ``,
})
export class HomePage {
  store = inject(tasksStore);
}
