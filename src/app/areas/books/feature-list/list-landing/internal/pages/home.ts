import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Stats } from "./stats";
import { List } from "./list";
import { Prefs } from "./prefs";

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, Stats, List, Prefs],
  template: `
    <app-ui-page title="list">
      <app-stats/>
      <app-prefs/>
      <app-list/>
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {

}