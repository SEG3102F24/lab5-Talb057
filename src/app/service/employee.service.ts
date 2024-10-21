import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }
  
  getEmployees(): Observable<Employee[]> {
    const employeesRef = collection(this.firestore, 'employees');
    return collectionData(employeesRef, { idField: 'id' }) as Observable<Employee[]>;
  }

  addEmployee(employee: Employee) {
    this.employees$.next([...this.employees$.getValue(), employee]);
    const employeesRef = collection(this.firestore, 'employees');
    return addDoc(employeesRef,employee);
  }
}
