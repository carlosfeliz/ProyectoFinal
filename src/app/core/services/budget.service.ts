import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public form2: FormGroup;
  public form3: FormGroup;

  types?: Category[];

  private transactionCollection: AngularFirestoreCollection<Transaction>;
  private transaction: Observable<Transaction[]>;

  constructor(private db: AngularFirestore, private formBuilder: FormBuilder) {
    this.transactionCollection = db.collection<Transaction>('/transacciones');
    this.transaction = this.transactionCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));

    this.form2 = this.formBuilder.group({
      cantidad: ['', [Validators.required, Validators.min(10)]],
      fecha: ['', [Validators.required]],
      cuenta: ['', [Validators.required]]
    });

    this.form3 = this.formBuilder.group({
      cantidad: ['', [Validators.required, Validators.min(10)]],
      fecha: ['', [Validators.required]],
      cuenta: ['', [Validators.required]]
    });
  }

  getAll() {
    return this.transaction;
  }

  getTransaction(id: string) {
    return this.transactionCollection.doc<any>(id).valueChanges();
  }

  create(transaction: Transaction) {
    return this.transactionCollection.add(transaction);
  }

  update(id: string, data: any) {
    return this.transactionCollection.doc(id).update(data);
  }

  delete(id: string) {
    return this.transactionCollection.doc(id).delete();
  }

  size() {
    this.db.collection("transacciones").get().subscribe(res => {
      console.log(res.size)
    });
  }

  get cantidad() {
    return this.form2.get("cantidad");
  }

  get fecha() {
    return this.form2.get("fecha");
  }

  get cuenta() {
    return this.form2.get("cuenta");
  }

  get cantidad1() {
    return this.form3.get("cantidad");
  }

  get fecha1() {
    return this.form3.get("fecha");
  }

  get cuenta1() {
    return this.form3.get("cuenta");
  }
}
