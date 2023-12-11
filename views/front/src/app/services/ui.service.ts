import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showModifyComponentAdd: boolean = false;
  private subjectAdd = new Subject<any>();
  private showModifyComponentUpdate: boolean = false;
  private subjectUpdate = new Subject<any>();
  private showModifyComponentDelete: boolean = false;
  private subjectDelete = new Subject<any>();

  constructor() {}

  toggleModifyComponentAdd(): void{
    this.showModifyComponentAdd = !this.showModifyComponentAdd;
    this.subjectAdd.next(this.showModifyComponentAdd);
  }

  onAddToggle(): Observable<any> {
    return this.subjectAdd.asObservable();
  }

  toggleModifyComponentUpdate(): void{
    this.showModifyComponentUpdate = !this.showModifyComponentUpdate;
    this.subjectUpdate.next(this.showModifyComponentUpdate);
  }

  onUpdateToggle(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }

  toggleDeleteModifyComponent(): void{
    this.showModifyComponentDelete = !this.showModifyComponentDelete;
    this.subjectDelete.next(this.showModifyComponentDelete);
  }

  onDeleteToggle(): Observable<any> {
    return this.subjectDelete.asObservable();
  }
}