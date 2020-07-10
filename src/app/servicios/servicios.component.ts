import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  	User: any;
	TipoUser: any;

	constructor() { 
		this.User = localStorage.getItem('user');
    	this.TipoUser = localStorage.getItem('tipo');
	}

  ngOnInit() {
  }

}
