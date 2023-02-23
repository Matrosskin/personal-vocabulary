import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NonNullableFormBuilder, Validators } from '@angular/forms';

import { IDescriptionProperty } from 'src/app/types/record-property-form.type';
import { AbstractPropertyFormComponent } from '../abstract-property-form/abstract-property-form.component';

@Component({
  selector: 'pv-description-property-form',
  templateUrl: './description-property-form.component.html',
  styleUrls: ['./description-property-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DescriptionPropertyFormComponent,
      multi: true
    }],
})
export class DescriptionPropertyFormComponent extends AbstractPropertyFormComponent<IDescriptionProperty> {
  propertyForm = this.nnfb.group({
    propertyValue: ['', [Validators.required]],
  });

  constructor(
    private readonly nnfb: NonNullableFormBuilder,
  ) {
    super();
  }
}
