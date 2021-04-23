import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AuthorsComponent} from './authors/authors.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: NotFoundComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
