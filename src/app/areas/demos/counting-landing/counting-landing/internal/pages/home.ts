import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: ` <app-ui-page title="counting"> </app-ui-page> `,
  styles: ``,
})
export class HomePage {}
