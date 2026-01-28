# The Clock

```typescript
import { Component, ChangeDetectionStrategy, effect, signal, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

export type Task = {
  startTime: Date;
  endTime: Date;
};

@Component({
  selector: 'app-labs-lab1-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
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
  `,
  styles: ``,
  host: {
    class: 'ml-auto',
  },
})
export class Clock {
  inTaskRecording = signal(false);
  taskAccomplished = output<Task>();
  tick = signal<Date>(new Date());

  private startTime = signal<Date | null>(null);

  currentTime = signal({
    hours: this.tick().getHours(),
    minutes: this.tick().getMinutes(),
    seconds: this.tick().getSeconds(),
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
    this.taskAccomplished.emit({
      startTime: this.startTime() || new Date(),
      endTime: new Date(),
    });
    this.startTime.set(null);
  }
}
```

## Home

```typescript
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Clock, Task } from '../widgets/clock';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, Clock, DatePipe, DecimalPipe],
  template: `
    <app-ui-page title="First Lab">
      <div class="flex flex-row">
        <app-labs-lab1-clock (taskAccomplished)="handleTask($event)" />
      </div>

      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Task</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Minutes</th>
          </tr>
        </thead>
        <tbody>
          @for (task of taskList(); track task.startTime) {
            <tr>
              <th>...</th>
              <td>{{ task.startTime | date: 'shortTime' }}</td>
              <td>{{ task.endTime | date: 'shortTime' }}</td>
              <td>{{ task.minutes }}</td>
            </tr>
          } @empty {
            <div class="alert alert-info">
              <p>No Tasks Yet! Get Busy</p>
            </div>
          }
        </tbody>
      </table>
      @let s = stats();
      <div class="stats shadow">
        <div class="stat place-items-center">
          <div class="stat-title">Number Of Tasks</div>
          <div class="stat-value">{{ s.totalTasks }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Total Minutes on Tasks</div>
          <div class="stat-value">{{ s.totalMinutes }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Average Length Of Task</div>
          <div class="stat-value">{{ s.averageMinutes | number: '1.0-2' }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Longest Time Spent On A Task</div>
          <div class="stat-value">{{ s.longestTask }}</div>
        </div>
      </div>
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {
  private tasks = signal<Task[]>([
    {
      startTime: new Date(),
      endTime: new Date(new Date().setMinutes(new Date().getMinutes() + 25)),
    },
    {
      startTime: new Date(new Date().setHours(new Date().getHours() - 1)),
      endTime: new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
    },
  ]);
  handleTask(task: Task) {
    this.tasks.update((tasks) => [task, ...tasks]);
  }

  taskList = computed(() => {
    // return a list of tasks with the number of minutes spent on each task
    return this.tasks().map((task) => {
      const minutes = Math.round((task.endTime.getTime() - task.startTime.getTime()) / 1000 / 60);
      return {
        ...task,
        minutes,
      };
    });
  });
  stats = computed(() => {
    const totalMinutes = this.taskList().reduce((acc, task) => acc + task.minutes, 0);
    const totalTasks = this.taskList().length;
    const averageMinutes = totalTasks === 0 ? 0 : totalMinutes / totalTasks;
    const longestTask = this.taskList().reduce(
      (max, task) => (task.minutes > max ? task.minutes : max),
      0,
    );
    return {
      totalMinutes,
      totalTasks,
      averageMinutes,
      longestTask,
    };
  });
}
```
