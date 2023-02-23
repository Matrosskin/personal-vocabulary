import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IPropertyForm } from 'src/app/types/record-property-form.type';

@Component({
  selector: 'pv-abstract-property-form',
  template: ``,
  styles: [],
})
export abstract class AbstractPropertyFormComponent<T extends {}> implements ControlValueAccessor, OnDestroy {
  @Output() onDeleteProperty = new EventEmitter<void>();

  abstract propertyForm: IPropertyForm<T>;

  onChangeSyb?: Subscription;
  onTouchedFn: any;

  writeValue(obj: T): void {
    this.propertyForm.patchValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChangeSyb = this.propertyForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.propertyForm.disable();
    } else {
      this.propertyForm.enable();
    }
  }

  ngOnDestroy(): void {
    this.onChangeSyb?.unsubscribe();
  }

  deleteProperty() {
    this.onDeleteProperty.emit();
  }
}
