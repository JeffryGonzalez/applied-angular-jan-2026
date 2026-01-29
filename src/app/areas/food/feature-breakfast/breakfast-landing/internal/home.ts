import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionLayout, SectionLink } from '@ht/shared/ui-common/layouts/section';

@Component({
  selector: 'app-breakfast-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionLayout],
  template: ` <app-ui-section-layout title="breakfast" [links]="links()" /> `,
  styles: ``,
})
export class Home {
  links = signal<SectionLink[]>([]);
}
