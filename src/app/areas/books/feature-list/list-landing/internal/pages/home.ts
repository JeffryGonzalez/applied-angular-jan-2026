import { Component, ChangeDetectionStrategy } from '@angular/core';
import { List } from '@ht/books/feature-list/list';
import { Stats } from '@ht/books/feature-list/stats';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

export interface book {
  title: string;
  id: string;
  author: string;
  year: number;
  pages: number;
}
@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, List, Stats],
  template: `
    <app-ui-page title="list">
      <app-stats />
      <app-list />
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {}
