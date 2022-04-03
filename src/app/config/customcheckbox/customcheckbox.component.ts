import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-customcheckbox',
  templateUrl: './customcheckbox.component.html',
  styleUrls: ['./customcheckbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomcheckboxComponent),
      multi: true
    }
  ]
})
export class CustomcheckboxComponent implements ControlValueAccessor, OnInit {

   // Step 3: Copy paste this stuff here
   onChange: any = () => {};
   onTouch: any = () => {};

   registerOnChange(fn: any): void {
     this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
     this.onTouch = fn;
   }

   constructor() {}

   ngOnInit() {}

   // Step 4: Define what should happen in this component, if something changes outside
   checked: boolean = false;
   writeValue(checked: boolean) {
     this.checked = checked;
   }


   onModelChange(e: boolean) {
     // Step 5a: bind the changes to the local value
     this.checked = e;

     // Step 5b: Handle what should happen on the outside, if something changes on the inside
     this.onChange(e);
   }

}
