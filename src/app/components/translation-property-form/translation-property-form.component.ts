import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NonNullableFormBuilder, Validators } from '@angular/forms';

import { Language } from 'src/app/constants/common';
import { ITranslationProperty } from 'src/app/types/record-property-form.type';
import { AbstractPropertyFormComponent } from '../abstract-property-form/abstract-property-form.component';

@Component({
  selector: 'pv-translation-property-form',
  templateUrl: './translation-property-form.component.html',
  styleUrls: ['./translation-property-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TranslationPropertyFormComponent,
      multi: true
    }],
})
export class TranslationPropertyFormComponent extends AbstractPropertyFormComponent<ITranslationProperty> {
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
