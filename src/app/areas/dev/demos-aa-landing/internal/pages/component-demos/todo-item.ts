import { Component, input, output } from '@angular/core';

// Demo 5: Component with complex interactions
@Component({
  selector: 'app-todo-item',
  standalone: true,
  template: `
    <div role="alert" class="alert shadow-lg">
      <input
        type="checkbox"
        [checked]="completed()"
        (change)="onToggle()"
        class="checkbox checkbox-primary"
      />
      <div class="flex-1">
        <span [class.line-through]="completed()" [class.opacity-50]="completed()">
          {{ text() }}
        </span>
      </div>
      <button (click)="onDelete()" class="btn btn-ghost btn-sm btn-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  `,
})
export class TodoItemComponent {
  text = input.required<string>();
  completed = input<boolean>(false);

  toggleCompleted = output<void>();
  deleteItem = output<void>();

  onToggle() {
    this.toggleCompleted.emit();
  }

  onDelete() {
    this.deleteItem.emit();
  }
}
