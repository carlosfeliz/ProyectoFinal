import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryService } from 'src/app/core/services/category.service';
import { Type } from 'src/app/core/models/type';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {

  public types = Type;

  categoryId = '';
  category: Category = {
    nombre: '',
    tipo: '',
    descripcion: ''
  };

  closeResult?: string;

  constructor(public categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
  }



  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params["id"];
    if (this.categoryId) {
      this.loadCategory();
    }
  }

  async loadCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe(res => {
      this.category = res;
    });
  }

  save() {
    if (this.categoryService.form.valid) {
      if (this.categoryId) {
        this.categoryService.update(this.categoryId, this.category);
      } else {
        this.categoryService.create(this.category);
      }
      this.router.navigate(['/category/list']);
    } else {
      this.categoryService.form.markAllAsTouched();
    }
  }

}
