import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { padHours, padMinutes, padSeconds } from '@ht/shared/util-dates/padding';
import { NgIcon } from '@ng-icons/core';
import { tasksStore } from '../stores/tasks';

export type Task = {
  startTime: Date;
  endTime: Date;
};

@Component({
  selector: 'app-labs-lab1-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    <div class="flex flex-col gap-2 items-end">
      <span>
        <span
          class=" text-sm text-gray-100 bg-gray-800 p-2 rounded delay-300"
          [class.animate-fade-in]="inTaskRecording()"
          [class.animate-fade-out]="!inTaskRecording()"
          [class.invisible]="!inTaskRecording()"
        >
          Task: {{ elapsedTime().hours }}:{{ elapsedTime().minutes.toString().padStart(2, '0') }}:{{
            elapsedTime().seconds.toString().padStart(2, '0')
          }}
        </span>
      </span>
      <div class="flex flex-row items-center">
        @if (inTaskRecording()) {
          <button class="btn btn-xs btn-circle btn-success mr-2" (click)="finishTask()">
            <ng-icon name="lucideX" size="20"></ng-icon>
          </button>
          <button class="btn btn-xs btn-circle btn-error mr-2" (click)="cancelTask()">
            <ng-icon name="lucideCircleSlash" size="20"></ng-icon>
          </button>
        } @else {
          <button (click)="startTask()" class="btn btn-xs btn-circle btn-success mr-2">
            <ng-icon name="lucidePlay" size="20"></ng-icon>
          </button>
        }
        <span
          class="countdown font-mono text-green-500 text-2xl "
          [class.animate-pulse]="inTaskRecording()"
        >
          <span
            style="--value:{{ currentTime().hours }};"
            aria-live="polite"
            aria-label="{{ currentTime().hours }}"
            >{{ currentTime().hours }}</span
          >
          :
          <span
            style="--value:{{ currentTime().minutes }}; --digits: 2;"
            aria-live="polite"
            aria-label="{{ currentTime().minutes }}"
            >{{ currentTime().minutes }}</span
          >
          :
          <span
            style="--value:{{ currentTime().seconds }}; --digits: 2;"
            aria-live="polite"
            aria-label="{{ currentTime().seconds }}"
            >{{ currentTime().seconds }}</span
          >
        </span>
      </div>
    </div>
  `,
  styles: ``,
  host: {
    class: 'ml-auto',
  },
})
export class Clock {
  inTaskRecording = signal(false);
  store = inject(tasksStore);
  tick = signal<Date>(new Date());

  private startTime = signal<Date | null>(null);

  currentTime = signal({
    hours: this.tick().getHours(),
    minutes: this.tick().getMinutes(),
    seconds: this.tick().getSeconds(),
  });

  elapsedTime = computed(() => {
    if (!this.inTaskRecording()) {
      return { hours: padHours(0), minutes: padMinutes(0), seconds: padSeconds(0) };
    }
    const now = this.tick();

    const start = this.startTime();
    if (start === null) {
      return { hours: padHours(0), minutes: padMinutes(0), seconds: padSeconds(0) };
    }
    const elapsedMs = now.getTime() - start.getTime();

    return {
      hours: padHours(elapsedMs),
      minutes: padMinutes(elapsedMs),
      seconds: padSeconds(elapsedMs),
    };
  });

  constructor() {
    setInterval(() => {
      this.tick.set(new Date());
    }, 1000);
    effect(() => {
      const now = this.tick();
      this.currentTime.set({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    });
  }

  startTask() {
    this.inTaskRecording.set(true);
    this.startTime.set(new Date());
  }
  cancelTask() {
    this.inTaskRecording.set(false);
    this.startTime.set(null);
  }
  finishTask() {
    this.inTaskRecording.set(false);
    this.store.addTask({
      startTime: this.startTime() || new Date(),
      endTime: new Date(),
    });
    this.startTime.set(null);
  }
}
