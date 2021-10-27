import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit,Input } from '@angular/core';
import { Router } from "@angular/router";
import { GenericService } from "src/app/services/generic/generic.service";
import { NavItem } from '../home/home.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger("indicatorRotate", [
        state("collapsed", style({ transform: "rotate(0deg)" })),
        state("expanded", style({ transform: "rotate(180deg)" })),
        transition(
            "expanded <=> collapsed",
            animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
        )
    ])
]
})
export class SidenavComponent implements OnInit {

  expanded: boolean =false;
  expandNav: boolean;
  selectedValue: any;
  selectedValues: any;
  @Input() item: NavItem;




  constructor(
    public genService:GenericService,
    private router:Router
  ) { }

  ngOnInit(): void {

  }
  onItemSelected(item) {
    console.log("expand1",item)


    let selectedValue = item.route;
    this.genService.activeTab = selectedValue;
    this.router.navigate(["/home/" + selectedValue]);
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
  }
    console.log("item clicked",selectedValue);

  }
  getClass() {
    console.log("expand",this.genService.activeTab);
    return {
      activeSideNavlist: true,
        expanded: this.expanded,
        clicked: (this.genService.activeTab == this.item.route)
    }
  }

}
