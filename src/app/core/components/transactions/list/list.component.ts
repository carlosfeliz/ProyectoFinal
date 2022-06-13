import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/core/models/category';
import { Transaction } from 'src/app/core/models/transaction';
import { BudgetService } from 'src/app/core/services/budget.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  closeResult?: string;
  transactionId = '';
  modal?: NgbModalRef;

  transaction?: Transaction[];
  category?: Category[];
  allTransactions?: any[];

  categoryId = '';

  constructor(private budgetService: BudgetService, private categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.budgetService.getAll().subscribe(res => {
      this.transaction = res;
      this.allTransactions = res;
    })
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    if(filterValue != ''){
      this.transaction = this.allTransactions?.filter((item) => item.tipo.includes(filterValue));
    } else {
      this.transaction = this.allTransactions;
    }
  }

  filter(filterValue: any){
    filterValue = filterValue.target.value;
    filterValue.toLowerCase();
    console.log(filterValue);
    if(filterValue != ''){
      this.transaction = this.allTransactions?.filter((item) => item.cuenta.toLowerCase().includes(filterValue));
    } else {
      this.transaction = this.allTransactions;
    }
  }

  async deleteTransaction(transactionId: string) {
    this.budgetService.delete(transactionId);
    this.getAllTransactions();
    this.modalService.dismissAll();
  }

  openVerticallyCentered(content: any, transactionId: any) {
    this.modal = this.modalService.open(content, { centered: true });
    this.transactionId = transactionId;
  }

}
