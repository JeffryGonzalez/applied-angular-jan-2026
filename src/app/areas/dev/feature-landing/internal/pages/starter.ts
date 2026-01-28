import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-dev-pages-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideMarkdown({})],
  imports: [PageLayout],
  template: `<app-ui-page title="The Starter App"> </app-ui-page>`,
  styles: ``,
})
export class StarterPage {}
