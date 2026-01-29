import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Clock, Task } from '../widgets/clock';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, Clock, DatePipe, DecimalPipe],
  template: `
    <app-ui-page title="Second Lab (But really the first one again)">
      <div class="flex flex-row ">
        <app-labs-lab2-clock (taskAccomplished)="handleTask($event)" />
      </div>

      <table class="table mb-8">
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

      <div class="stats shadow flex flex-row bg-base-100 mt-auto p-6">
        <div class="stat place-items-center">
          <div class="stat-title">Number Of Tasks</div>
          <div class="stat-value text-primary">{{ s.totalTasks }}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Total Minutes on Tasks</div>
          <div class="stat-value text-primary">{{ s.totalMinutes }}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Average Length Of Task</div>
          <div class="stat-value text-primary">{{ s.averageMinutes | number: '1.0-2' }}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Longest Time Spent On A Task</div>
          <div class="stat-value text-primary">{{ s.longestTask }}</div>
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
