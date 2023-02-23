import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { EditVocabularyItemComponent } from './pages/edit-vocabulary-item/edit-vocabulary-item.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


export enum RouterPathes {
  Home = 'home',
  VocabularyList = 'list',
  CreateVocabularyRecord = 'new',
  EditVocabularyRecord = 'edit/:id',
}

const routes: Routes = [
  {
    path: '',
    redirectTo: RouterPathes.VocabularyList,
    pathMatch: 'full' ,
  },
  {
    title: 'About the app "Personal Vocabulary"',
    path: RouterPathes.Home,
    component: HomeComponent,
  },
  {
    title: 'List of stored items.',
    path: RouterPathes.VocabularyList,
    component: ListComponent,
  },
  {
    title: 'Create Vocabulary item.',
    path: RouterPathes.CreateVocabularyRecord,
    component: EditVocabularyItemComponent,
  },
  {
    title: 'Edit Vocabulary item.',
    path: RouterPathes.EditVocabularyRecord,
    component: EditVocabularyItemComponent,
  },
  {
    title: 'Edit Vocabulary item.',
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
