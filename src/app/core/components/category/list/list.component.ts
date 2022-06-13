import { Component, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  closeResult?: string;
  categoryId = '';
  modal?: NgbModalRef;

  category?: Category[];
  allCategories?: any[];


  constructor(private categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(res => {
      this.category = res;
      this.allCategories = res;
    })
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    if(filterValue != ''){
      this.category = this.allCategories?.filter((item) => item.tipo.includes(filterValue));
    } else {
      this.category = this.allCategories;
    }
  }

  filter(filterValue: any){
    filterValue = filterValue.target.value;
    filterValue.toLowerCase();
    console.log(filterValue);
    if(filterValue != ''){
      this.category = this.allCategories?.filter((item) => item.nombre.toLowerCase().includes(filterValue));
    } else {
      this.category = this.allCategories;
    }
  }

  async deleteCategory(categoryId: string) {
    this.categoryService.delete(categoryId);
    //console.log(categoryId);
    this.getAllCategory();
    this.modalService.dismissAll();
  }

  openVerticallyCentered(content: any, categoryId: any) {
    this.modal = this.modalService.open(content, { centered: true });
    this.categoryId = categoryId;
  }



}
