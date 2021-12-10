
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
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
    private router:Router,
    private authentication:AuthenticationService
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
    this.authentication.logOut();
    this.router.navigate(['/login'])
  }

  navItems: NavItem[] = [
    {
      displayName: 'User',
      iconName: 'search',
      route: '',
      children: [
        {
          displayName: 'Edit User',
          iconName: 'edit',
          route: 'useredit',
        },
        {
          displayName: 'useradd',
          iconName: 'person_add',
          route: 'useradd',

        },
        {
          displayName: 'User list',
          iconName: 'list',
          route: 'userlist'
        }
      ]
    },
    {
      displayName: 'Product',
      iconName: 'add_business',
      route: '',
      children: [
        {
          displayName: 'add Product',
          iconName: 'home_repair_service',
          route: 'addproduct'

        },
        {
          displayName: 'list product',
          iconName: 'production_quantity_limits',
          route: 'listproduct'
        },

      ]
    },
  ];

}
