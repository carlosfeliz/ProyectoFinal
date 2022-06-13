import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'income',
    component: IncomeComponent
  },
  {
    path: 'expense',
    component: ExpenseComponent
  },
  {
    path: '**',
    redirectTo: 'income'
  }
]

@NgModule({
  declarations: [
    IncomeComponent,
    ExpenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BudgetModule { }
