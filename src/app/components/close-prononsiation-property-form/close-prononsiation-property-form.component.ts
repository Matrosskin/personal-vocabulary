import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NonNullableFormBuilder, Validators } from '@angular/forms';

import { IClosePrononsiationProperty } from 'src/app/types/record-property-form.type';
import { AbstractPropertyFormComponent } from '../abstract-property-form/abstract-property-form.component';

@Component({
  selector: 'pv-close-prononsiation-property-form',
  templateUrl: './close-prononsiation-property-form.component.html',
  styleUrls: ['./close-prononsiation-property-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClosePrononsiationPropertyFormComponent,
      multi: true
    }],
})
export class ClosePrononsiationPropertyFormComponent extends AbstractPropertyFormComponent<IClosePrononsiationProperty> {
  propertyForm = this.nnfb.group({
    propertyValue: ['', [Validators.required]],
  });

  constructor(
    private readonly nnfb: NonNullableFormBuilder,
  ) {
    super();
  }
}
