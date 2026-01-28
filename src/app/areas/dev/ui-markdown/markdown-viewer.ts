/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-dev-ui-markdown-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent],
  template: `
    <div class="prose prose-lg line-numbers max-w-none! p-4  mt-8 bg-base-100 ">
      <markdown [src]="src()" (error)="onError.emit($event)" (ready)="onSuccess.emit()"></markdown>
    </div>
  `,
  styles: ``,
})
export class MarkdownViewer {
  src = input.required<string>();
  onError = output<string | Error>();
  onSuccess = output<void>();
}
