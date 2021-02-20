import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./clients-list/clients-list.module').then( m => m.ClientsListPageModule)
  },
  {
    path: 'add-client',
    loadChildren: () => import('./client-form/client-form.module').then( m => m.ClientFormPageModule)
  },
  {
    path: 'edit-client/:id',
    loadChildren: () => import('./client-form/client-form.module').then( m => m.ClientFormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
