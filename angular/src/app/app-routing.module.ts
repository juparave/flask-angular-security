import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticlesCreationComponent} from './articles/articles-creation/articles-creation.component';
import {ArticlesListComponent} from './articles/articles-list/articles-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'articles', component: ArticlesListComponent, children: [
      {path: 'add', component: ArticlesCreationComponent},
    ]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}