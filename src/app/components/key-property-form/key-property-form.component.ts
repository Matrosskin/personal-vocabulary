import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NonNullableFormBuilder, Validators } from '@angular/forms';

import { Language } from 'src/app/constants/common';
import { IKeyProperty } from 'src/app/types/record-property-form.type';
import { AbstractPropertyFormComponent } from '../abstract-property-form/abstract-property-form.component';

@Component({
  selector: 'pv-key-property-form',
  templateUrl: './key-property-form.component.html',
  styleUrls: ['./key-property-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: KeyPropertyFormComponent,
      multi: true
    }],
})
export class KeyPropertyFormComponent extends AbstractPropertyFormComponent<IKeyProperty> {
  propertyForm = this.nnfb.group({
    propertyValue: ['', [Validators.required]],
    valueLanguage: [Language.EN, [Validators.required]],
  });

  constructor(
    private readonly nnfb: NonNullableFormBuilder,
  ) {
    super();
  }
}
