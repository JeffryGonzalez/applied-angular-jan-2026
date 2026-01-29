import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { tasksStore } from '../data/stores/tasks/store';

@Component({
  selector: 'app-tasks-speed-dial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    <div class="fab">
      <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-success">
        <ng-icon name="lucideFileCheck" />
      </div>
      @if (store.isRecording()) {
        <div>
          Save Recording
          <button (click)="store.finishRecording()" class="btn btn-lg btn-circle">
            <ng-icon name="lucideCheckCircle" />
          </button>
        </div>
        <div>
          Cancel Recording
          <button (click)="store.cancelRecording()" class="btn btn-lg btn-circle">
            <ng-icon name="lucideCircleSlash" />
          </button>
        </div>
      } @else {
        <div>
          Start Recording
          <button (click)="store.startRecording()" class="btn btn-lg btn-circle">
            <ng-icon name="lucideVoicemail" />
          </button>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class SpeedDial {
  // Angular Style Guide now says you should default to declaring properties on a component as
  // "protected" - weird...
  // Neither public, private, nor protected exist in JavaScript. They are typescript inventions.
  protected store = inject(tasksStore);
}
