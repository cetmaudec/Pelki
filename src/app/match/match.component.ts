import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

   	User: any;
	TipoUser: any;

	constructor() { 
		this.User = localStorage.getItem('user');
    	this.TipoUser = localStorage.getItem('tipo');
	}

  ngOnInit() {
  }

}