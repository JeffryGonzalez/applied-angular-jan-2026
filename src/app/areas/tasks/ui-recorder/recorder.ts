import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { padHours, padMinutes, padSeconds } from '@ht/shared/util-dates/padding';
import { NgIcon } from '@ng-icons/core';
import { tasksStore } from '../../shared/data/stores/tasks/store';

@Component({
  selector: 'app-task-recorder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    <div class="fixed top-0 right-4 z-50 flex flex-row  ">
      <div
        class="bg-base-100/90  delay-300  shadow rounded-b-lg border-l-2  border-r-2 border-base-300 p-2"
      >
        @if (store.isRecording()) {
          <span class="" animate.enter="animate-slide-down" animate.leave="animate-slide-up">
            <span class="font-mono text-green-400 animate-pulse text-sm p-2 rounded delay-300">
              {{ elapsedTime().hours }}:{{ elapsedTime().minutes.toString().padStart(2, '0') }}:{{
                elapsedTime().seconds.toString().padStart(2, '0')
              }}
            </span>
          </span>
          <button class="btn btn-xs btn-circle btn-success mr-2" (click)="done('keep')">
            <ng-icon name="lucideCheckCircle" size="20"></ng-icon>
          </button>
          <button class="btn btn-xs btn-circle btn-error mr-2" (click)="done('cancel')">
            <ng-icon name="lucideCircleSlash" size="20"></ng-icon>
          </button>
        }
      </div>
      <button
        class="btn btn-xs btn-circle btn-success mr-2"
        (click)="store.startRecording()"
        [class.invisible]="store.isRecording()"
      >
        <ng-icon name="lucideVoicemail" size="20"></ng-icon>
      </button>
    </div>
  `,
  styles: ``,
  host: {
    class: 'position-absolute top-0 right-0 h-24 w-24',
  },
})
export class Recorder {
  protected store = inject(tasksStore);

  protected elapsedTime = computed(() => {
    if (!this.store.isRecording()) {
      return { hours: padHours(0), minutes: padMinutes(0), seconds: padSeconds(0) };
    }
    const now = this.store.currentTime();

    const start = this.store.startTime();
    const startHours = start ? start.getHours() : 0;
    const startMinutes = start ? start.getMinutes() : 0;
    const startSeconds = start ? start.getSeconds() : 0;

    if (start === null) {
      return { hours: padHours(0), minutes: padMinutes(0), seconds: padSeconds(0) };
    }
    const elapsedMs =
      new Date(1, 1, 1, now.hours, now.minutes, now.seconds).getTime() -
      new Date(1, 1, 1, startHours, startMinutes, startSeconds).getTime();

    return {
      hours: padHours(elapsedMs),
      minutes: padMinutes(elapsedMs),
      seconds: padSeconds(elapsedMs),
    };
  });

  how = signal<'hide' | 'show'>('hide');
  done(why: 'cancel' | 'keep') {
    if (why === 'cancel') {
      this.store.cancelRecording();
    } else {
      this.store.finishRecording();
    }
  }
}
