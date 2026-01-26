import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionLayout, SectionLink } from '@ht/shared/ui-common/layouts/section';

@Component({
  selector: 'app-dev-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionLayout],
  template: `
    <app-ui-section-layout title="Links And Resources For Developers" [links]="links()" />
  `,
  styles: ``,
})
export class Home {
  links = signal<SectionLink[]>([
    {
      title: 'Add A New Link',
      path: 'add',
    },
  ]);
}
