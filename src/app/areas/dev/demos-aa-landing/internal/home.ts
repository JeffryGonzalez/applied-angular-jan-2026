import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SectionLayout, SectionLink } from '@ht/shared/ui-common/layouts/section';

@Component({
  selector: 'app-demos-aa-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionLayout],
  template: ` <app-ui-section-layout title="demos-aa" [links]="links()" /> `,
  styles: ``,
})
export class Home {
  links = signal<SectionLink[]>([
    {
      title: 'Components',
      path: 'components',
    },

    { title: 'Computed', path: 'computing' },
    { title: 'Linked Signals', path: 'linked-signals' },
    { title: 'Effects', path: 'effects' },
    {
      title: 'Services',
      path: 'services',
    },
    {
      title: 'Forms Example',
      path: 'form',
    },
  ]);
}
