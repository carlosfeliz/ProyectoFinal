import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public form: FormGroup;

  private categoryCollection: AngularFirestoreCollection<Category>;
  private category: Observable<Category[]>;

  categ: Category[] = [];

  constructor(private db: AngularFirestore, private formBuilder: FormBuilder) {
    this.categoryCollection = db.collection<Category>('/categorias');
    this.category = this.categoryCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required]],
      descripcion: ['']
    });
  }

  getAll() {
    return this.category;
  }

  getCategory(id: string) {
    return this.categoryCollection.doc<any>(id).valueChanges();
  }

  create(category: any) {
    return this.categoryCollection.add(category);
  }

  update(id: string, data: any) {
    return this.categoryCollection.doc(id).update(data);
  }

  delete(id: string) {
    return this.categoryCollection.doc(id).delete();
  }

  size() {
    this.db.collection("categorias").get().subscribe(res => {
      console.log(res.size)
    });
  }

  get nombre() {
    return this.form.get("nombre");
  }

  get tipo() {
    return this.form.get("tipo");
  }

  public getTypes(category: any): Category[] {
    return this.categ.filter( t => t.tipo === category)
  }



}
