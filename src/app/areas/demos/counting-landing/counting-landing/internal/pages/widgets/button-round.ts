import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-counting-button-round',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <button
      [disabled]="disabled()"
      class=" btn btn-circle p-4"
      [class.btn-success]="intent() === 'success'"
      [class.btn-error]="intent() === 'error'"
      [class.btn-warning]="intent() === 'warning'"
      [class.btn-info]="intent() === 'info'"
      [class.btn-secondary]="intent() === 'secondary'"
    >
      {{ label() }}
    </button>
    <div class="tooltip-content">
      <div class="btn animate-bounce text-orange-400 -rotate-10 text-2xl font-black">Do It!</div>
    </div>
  `,
  styles: ``,
  host: {
    class: 'tooltip p-2 ',
    '(click)': 'clicked.emit()',
  },
})
export class ButtonRound {
  // whatever you pass in, I'm only going to take the first letter of it
  disabled = input(false, {
    transform: booleanAttribute,
  });
  label = input.required<'*' | '-' | '+' | '/'>();
  intent = input<'success' | 'error' | 'warning' | 'info' | 'secondary'>('info');

  clicked = output<void>();
  // talk about this - I suck at it but I'm trying.
  protected btnType = computed(() => {
    switch (this.label()) {
      case '+':
        return 'btn-success';
      case '-':
        return 'btn-error';
      case '*':
        return 'btn-warning';
      case '/':
        return 'btn-info';
      default:
        return 'btn-secondary';
    }
  });
}
