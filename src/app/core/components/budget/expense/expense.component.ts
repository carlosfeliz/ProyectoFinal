import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { Transaction } from 'src/app/core/models/transaction';
import { Type } from 'src/app/core/models/type';
import { BudgetService } from 'src/app/core/services/budget.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  public types = Type;

  category?: Category[];

  transactionId = '';
  transaction: Transaction = {    
    cantidad: 0,
    fecha: '',
    tipo: 'Gastos',
    cuenta: ''
  };

  constructor(public categoryService: CategoryService, public budgetService: BudgetService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.loadCategory();
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(res => {
      this.category = res;
      let ingresos = this.category.filter(tipo => tipo.tipo === Type.EXPENSE);
      this.category = ingresos;
    })
  }

  save() {
    if (this.budgetService.form3.valid) {
      if (this.transactionId) {
        this.budgetService.update(this.transactionId, this.transaction);
      } else {
        this.budgetService.create(this.transaction);
      }
      this.router.navigate(['/transactions']);
    } else {
      this.budgetService.form3.markAllAsTouched();
    }
  }

}
