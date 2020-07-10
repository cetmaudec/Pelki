import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  User: any;
  TipoUser: any;

  constructor() { 
    this.User = localStorage.getItem('user');
    this.TipoUser = localStorage.getItem('tipo');
  }

  ngOnInit() {
  }
}
