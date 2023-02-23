import { FormControl, FormGroup } from "@angular/forms";

import { Language } from "src/app/constants/common";

// NOTE: This enum also used as form control's names.
export enum RecordPropertyType {
  Key = 'key',
  Translation = 'translation',
  ClosePrononsiation = 'closePrononsiation',
  Description = 'description',
};

export interface IRecordProperty {
  propertyValue: string,
}

export interface IKeyProperty extends IRecordProperty {
  valueLanguage: Language,
};

export interface ITranslationProperty extends IRecordProperty {
  valueLanguage: Language,
};

export interface IClosePrononsiationProperty extends IRecordProperty {};

export interface IDescriptionProperty extends IRecordProperty {};

export type IAllRecordProperty = IKeyProperty | ITranslationProperty | IClosePrononsiationProperty |
  IDescriptionProperty;

export interface IPropertyForm<T> extends FormGroup<{
  [K in keyof T]: FormControl<T[K]>
}> {};

export interface IRecordFormData {
  id?: number;
  [RecordPropertyType.Key]?: IKeyProperty,
  [RecordPropertyType.Translation]?: ITranslationProperty,
  [RecordPropertyType.ClosePrononsiation]?: IClosePrononsiationProperty,
  [RecordPropertyType.Description]?: IDescriptionProperty,
};
