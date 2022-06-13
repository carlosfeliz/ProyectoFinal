import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category';
import { BudgetService } from 'src/app/core/services/budget.service';
import { Transaction } from 'src/app/core/models/transaction';
import { Type } from 'src/app/core/models/type';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  submitted = false;
  active = 1;

  transactionId = '';
  transaction: Transaction = {    
    cantidad: 0,
    fecha: '',
    tipo: 'Ingresos',
    cuenta: ''
  };
  
  category?: Category[];

  categories: Category = {
    nombre: '',
    tipo: '',
    descripcion: ''
  };

  public types = Type;

  closeResult?: string;

  categoryId = '';
  //categ: Category[];

  constructor(public categoryService: CategoryService, public budgetService: BudgetService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(res => {
      this.category = res;
      let ingresos = this.category.filter(tipo => tipo.tipo === Type.INCOME);
      this.category = ingresos;
    })
  }

  save() {
    if (this.budgetService.form2.valid) {
      if (this.transactionId) {
        this.budgetService.update(this.transactionId, this.transaction);
      } else {
        this.budgetService.create(this.transaction);
      }
      this.router.navigate(['/transactions']);
    } else {
      this.budgetService.form2.markAllAsTouched();
    }
  }



}
