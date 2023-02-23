import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { RouterPathes } from 'src/app/app-routing.module';
import { CrudVocabularyRecordService } from 'src/app/services/crud-vocabulary-record.service';
import { IRecordFormData } from 'src/app/types/record-property-form.type';

@Component({
  selector: 'pv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: { class: 'pv-page-wrapper' },
})
export class ListComponent implements OnInit {

  RouterPathes = RouterPathes;

  records$?: Observable<IRecordFormData[]>

  selectedRecordId?: number;

  constructor(
    private readonly crudVocabularyRecordService: CrudVocabularyRecordService,
  ) {}

  ngOnInit(): void {
    this.records$ = this.crudVocabularyRecordService.isDbReady$
      .pipe(
        switchMap(() => this.crudVocabularyRecordService.fetchVocabulary())
      );
  }

  toggleFitering(): void {
    throw new Error('Not yet implemented.');
  }
}
