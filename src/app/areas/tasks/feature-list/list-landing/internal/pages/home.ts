import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { tasksStore } from '../../stores/tasks';

// Creating a provider WHEREEVER means you are saying "create a new instance of this thing when injected here"
@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, DatePipe, DecimalPipe],

  template: `
    <app-ui-page title="First Lab">
      <table class="table mb-8">
        <!-- head -->
        <thead>
          <tr>
            <th>Task</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Minutes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (task of store.taskList(); track task.startTime) {
            <tr [title]="task.id" class=" animate-fade-out">
              <th>{{ task.description }}</th>
              <td>{{ task.startTime | date: 'shortTime' }}</td>
              <td>{{ task.endTime | date: 'shortTime' }}</td>
              <td>{{ task.minutes }}</td>
              <td colspan="5 ">
                <button class="btn btn-error btn-circle" (click)="store.deleteTask(task)">X</button>
                <button (click)="store.changeDescription(task, 'New Description')">
                  Change Description
                </button>
              </td>
            </tr>
          } @empty {
            <div class="alert alert-info">
              <p>No Tasks Yet! Get Busy</p>
            </div>
          }
        </tbody>
      </table>
      @let s = store.stats();
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
  store = inject(tasksStore);
}
