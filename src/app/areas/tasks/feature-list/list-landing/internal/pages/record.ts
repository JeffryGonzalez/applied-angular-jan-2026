import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Clock } from '../../widgets/clock';
import { tasksStore } from '../../stores/tasks';

@Component({
  selector: 'app-tasks-pages-record',

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, Clock],
  providers: [],
  template: `<app-ui-page title="record">
    <app-labs-lab1-clock />
  </app-ui-page>`,
  styles: ``,
})
export class RecordPage {
  store = inject(tasksStore);
}
