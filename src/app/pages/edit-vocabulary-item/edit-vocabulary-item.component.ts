import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, startWith, Subscription } from 'rxjs';

import { Language } from 'src/app/constants/common';
import { CrudVocabularyRecordService } from 'src/app/services/crud-vocabulary-record.service';
import { IClosePrononsiationProperty, IDescriptionProperty, IKeyProperty, ITranslationProperty, RecordPropertyType, IAllRecordProperty, IRecordProperty, IRecordFormData } from '../../types/record-property-form.type';


@Component({
  selector: 'pv-edit-vocabulary-item',
  templateUrl: './edit-vocabulary-item.component.html',
  styleUrls: ['./edit-vocabulary-item.component.scss'],
  host: { class: 'pv-page-wrapper' },
})
export class EditVocabularyItemComponent implements OnInit, OnDestroy {
  RecordPropertyType = RecordPropertyType;

  recordForm = this.nnfb.group<IRecordFormData>({});

  keyPropertyChangesSubscription?: Subscription;
  translationPropertyChangesSubscription?: Subscription;
  saveSubscription?: Subscription;

  recordId?: number;

  constructor(
    private readonly crudVocabularyRecordService: CrudVocabularyRecordService,
    private readonly location: Location,
    private readonly nnfb: NonNullableFormBuilder,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.crudVocabularyRecordService.isDbReady$.subscribe(() => {
      this.route.paramMap.subscribe(paramMap => {
        this.recordForm = this.nnfb.group<IRecordFormData>({});

        const recordId = paramMap.get('id');
        if (recordId) {
          this.crudVocabularyRecordService.fetchRecord(Number(recordId)).subscribe(result => {
            this.recordForm.addControl('id', this.nnfb.control(result.id));

            [
              RecordPropertyType.Key,
              RecordPropertyType.Translation,
              RecordPropertyType.ClosePrononsiation,
              RecordPropertyType.Description,
            ].forEach(propertyName => {
              if (result.hasOwnProperty(propertyName)) {
                this.addProperty(propertyName, result[propertyName]);
              }
            });
          });
        } else {
          this.addProperty(RecordPropertyType.Key);
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.keyPropertyChangesSubscription?.unsubscribe();
    this.translationPropertyChangesSubscription?.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  deleteProperty(type: RecordPropertyType) {
    this.recordForm.removeControl(type);

    if (RecordPropertyType.Key === type) {
      this.keyPropertyChangesSubscription?.unsubscribe();
    }
    if (RecordPropertyType.Translation === type) {
      this.translationPropertyChangesSubscription?.unsubscribe();
    }
  }

  addProperty(type: RecordPropertyType, propertyInitialData = this.getPropertyInitialData(type)): void {
    const newControl = this.nnfb.control(propertyInitialData, [
      (control: AbstractControl<IRecordProperty>): ValidationErrors | null => {
        if (control.value.propertyValue) {
          return  null;
        }

        return { required: true };
      }
    ]);
    this.recordForm.addControl(type, newControl, { emitEvent: false });

    if (RecordPropertyType.Key === type) {
      this.addKeyLanguageChangeHandler(newControl as FormControl<IKeyProperty>);
    }

    if (RecordPropertyType.Translation === type) {
      this.addTranslationLanguageChangeHandler(newControl as FormControl<ITranslationProperty>);
    }
  }

  private getPropertyInitialData(type: RecordPropertyType): IAllRecordProperty {
    switch (type) {
      case RecordPropertyType.Key:
        const keyValueLanguage = this.getKeyValueLanguage();
        return { propertyValue: '', valueLanguage: keyValueLanguage };
      case RecordPropertyType.Translation:
        const translationValueLanguage = this.getTranslationValueLanguage();
        return { propertyValue: '', valueLanguage: translationValueLanguage };
      case RecordPropertyType.ClosePrononsiation:
        return { propertyValue: '' };
      case RecordPropertyType.Description:
        return { propertyValue: '' };
      default:
        throw new Error("Unknown property type.");
    }
  }

  private getKeyValueLanguage(): Language {
    return this.recordForm.get(RecordPropertyType.Translation)?.value?.valueLanguage === Language.EN
      ? Language.UA
      : Language.EN;
  }

  private getTranslationValueLanguage(): Language {
    return this.recordForm.get(RecordPropertyType.Key)?.value?.valueLanguage === Language.EN
      ? Language.UA
      : Language.EN;
  }

  private addKeyLanguageChangeHandler(newKeyPropertyControl: FormControl<IKeyProperty>): void {
    this.keyPropertyChangesSubscription = newKeyPropertyControl.valueChanges
      .pipe(
        filter(Boolean),
        map(property => property.valueLanguage),
        startWith(newKeyPropertyControl.value.valueLanguage),
        distinctUntilChanged(),
      )
      .subscribe(valueLanguage => {
        const translationControl = this.recordForm.get(RecordPropertyType.Translation) as FormControl<ITranslationProperty>;
        if (translationControl && translationControl.value?.valueLanguage === valueLanguage) {
          translationControl.setValue(
            {
              ...translationControl.value!,
              valueLanguage: this.getTranslationValueLanguage(),
            },
            { emitEvent: false }
          );
        }
      });
  }

  private addTranslationLanguageChangeHandler(newTranslationPropertyControl: FormControl<ITranslationProperty>): void {
    const propertyInitialData = newTranslationPropertyControl.value;
    this.translationPropertyChangesSubscription = (newTranslationPropertyControl as FormControl<ITranslationProperty>).valueChanges
      .pipe(
        filter(Boolean),
        map(property => property.valueLanguage),
        startWith((propertyInitialData as ITranslationProperty).valueLanguage),
        distinctUntilChanged(),
      )
      .subscribe(valueLanguage => {
        const keyControl = this.recordForm.get(RecordPropertyType.Key) as FormControl<IKeyProperty>;
        if (keyControl && keyControl.value?.valueLanguage !== valueLanguage) {
          keyControl.setValue({
            ...keyControl.value!,
            valueLanguage: this.getKeyValueLanguage(),
          },
          { emitEvent: false });
        }
      });
  }

  isAnyPropertyAdded(): boolean {
    return Boolean(Object.keys(this.recordForm.controls).length);
  }

  saveRecord(): void {
    this.saveSubscription = this.crudVocabularyRecordService.saveRecord(this.recordForm.value)
      .subscribe(recordId => {
        const idControl = this.recordForm.get('id');
        if (!idControl) {
          this.recordForm.addControl('id', this.nnfb.control(recordId));
        } else {
          idControl.setValue(recordId);
        }

        this.saveSubscription = undefined;
      });
  }
}
