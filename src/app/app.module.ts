import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { BottomRightPlaceholderComponent } from './components/bottom-right-placeholder/bottom-right-placeholder.component';
import { EditVocabularyItemComponent } from './pages/edit-vocabulary-item/edit-vocabulary-item.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { KeyPropertyFormComponent } from './components/key-property-form/key-property-form.component';
import { TranslationPropertyFormComponent } from './components/translation-property-form/translation-property-form.component';
import { ClosePrononsiationPropertyFormComponent } from './components/close-prononsiation-property-form/close-prononsiation-property-form.component';
import { DescriptionPropertyFormComponent } from './components/description-property-form/description-property-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    BottomRightPlaceholderComponent,
    EditVocabularyItemComponent,
    PageNotFoundComponent,
    KeyPropertyFormComponent,
    TranslationPropertyFormComponent,
    ClosePrononsiationPropertyFormComponent,
    DescriptionPropertyFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
