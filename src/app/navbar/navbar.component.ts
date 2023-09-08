import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//Componentes
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

// Servicios
import { DepartamentoService } from '../departamento.service';
import { CargoService } from '../cargo.service';


// Interfaces
import { Departamento } from '../departamento';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  listDepas: Departamento[] = [];
  listCargos: Cargo[] = [];

  constructor(public dialog: MatDialog, public _depaService: DepartamentoService, public _cargoService: CargoService) { }

  ngOnInit(): void {
    this.getListDepas();
    this.getListCargos();
  }

  getListDepas() {
    this._depaService.getListDepas().subscribe((data: Departamento[]) => {
      this.listDepas = data;
    })
  }

  getListCargos() {
    this._cargoService.getListCargos().subscribe((data: Cargo[]) => {
      this.listCargos = data;
    })
  }

  openDialog() {
    this.dialog.open(AddEditUserComponent, {
      height: '65%',
      width: '35%',
    });
  }
}
