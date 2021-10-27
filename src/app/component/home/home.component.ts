
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic/generic.service';
// import { NavItem } from './nav-item';


export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})


export class HomeComponent implements OnInit {

  expandNav: boolean = false;


  @HostBinding('attr.aria-expanded') ariaExpanded = this.expandNav;
  @Input() item: NavItem;
  @Input() depth: number;
  expanded: any;

  constructor(
    public genService:GenericService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.item !=undefined){
      console.log("items  data",this.item);
    }

  }


  activeLink(data:any){
    this.genService.activeTab = data;
    this.router.navigate(["/home/" + data]);
  }

  logout(){
    // this.genService.activeTab = data;
    // this.router.navigate(["/home/" + data]);
  }

  navItems: NavItem[] = [
    {
      displayName: 'User',
      iconName: 'search',
      route: '',
      children: [
        {
          displayName: 'Edit User',
          iconName: 'search',
          route: 'useredit',
        },
        {
          displayName: 'useradd',
          iconName: 'search',
          route: 'useradd',

        },
        {
          displayName: 'User list',
          iconName: 'search',
          route: 'userlist'
        }
      ]
    },
    {
      displayName: 'Disney',
      iconName: 'search',
      route: 'disney',
      children: [
        {
          displayName: 'disney1',
          iconName: 'search',
          route: 'disney/speakers'

        },
        {
          displayName: 'disney hotstar',
          iconName: 'search',
          route: 'disney/sessions'
        },
        {
          displayName: 'disney feedback',
          iconName: 'search',
          route: 'disney/feedback'
        }
      ]
    },
  ];

}
