import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic/generic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  expandNav: boolean = false;

  constructor(
    public genService:GenericService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }


  activeLink(data:any){
    this.genService.activeTab = data;
    this.router.navigate(["/home/" + data]);
  }

  logout(){
    // this.genService.activeTab = data;
    // this.router.navigate(["/home/" + data]);
  }

}
