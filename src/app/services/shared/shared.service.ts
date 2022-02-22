import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class SharedService {
isVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

isAvilable:Subject<boolean> = new Subject<boolean>();

Avilable(){
  let avilable=true;
  this.isAvilable.next(avilable);
}


}


