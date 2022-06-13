import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'transactions',
    loadChildren: () => import('./core/components/transactions/transactions.module').then( m => m.TransactionsModule)
  },
  {
    path: 'budget',
    loadChildren: () => import('./core/components/budget/budget.module').then(m => m.BudgetModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./core/components/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: '',
    loadChildren: () => import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
