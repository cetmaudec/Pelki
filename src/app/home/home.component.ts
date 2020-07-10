import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	User: any;
	TipoUser: any;

	constructor() { 
		this.User = localStorage.getItem('user');
    this.TipoUser = localStorage.getItem('tipo');
	}

  ngOnInit() {
  }
}
