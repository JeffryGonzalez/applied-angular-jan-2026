import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { List } from './list';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, JsonPipe, List],
  template: `
    <app-ui-page title="list">
      <app-book-list> </app-book-list>
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {
  booksResource = httpResource(() => '/api/books');
}
