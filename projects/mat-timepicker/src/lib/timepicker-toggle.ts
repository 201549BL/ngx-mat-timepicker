import {
  Component,
  ChangeDetectionStrategy,
  Directive,
  ViewEncapsulation,
  Input,
  ContentChild,
  Attribute,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { MatTimepicker } from './timepicker';

@Directive({ selector: '[matTimepickerToggleIcon]' })
export class MatTimepickerToggleIcon {}

@Component({
  selector: 'mat-timepicker-toggle',
  templateUrl: './timepicker-toggle.html',
  styleUrls: ['./timepicker-toggle.scss'],
  exportAs: 'matTimepickerToggle',
  host: {
    class: 'mat-timepicker-toggle',
    '[attr.tabindex]': 'null',
    '(click)': 'open($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatTimepickerToggle {
  /** Timepicker instance. */
  @Input('for') timepicker: MatTimepicker;

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.timepicker) {
      return this.timepicker.disabled;
    }

    return !!this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  /** Whether ripples on the toggle should be disabled. */
  @Input() disableRipple: boolean;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Custom icon set by the consumer. */
  @ContentChild(MatTimepickerToggleIcon) customIcon: MatTimepickerToggleIcon;

  constructor(@Attribute('tabindex') defaultTabIndex: string) {
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex =
      parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
  }

  /** Opens timepicker. */
  open(event: Event): void {
    if (this.timepicker && !this.disabled) {
      this.timepicker.open();
      event.stopPropagation();
    }
  }
}