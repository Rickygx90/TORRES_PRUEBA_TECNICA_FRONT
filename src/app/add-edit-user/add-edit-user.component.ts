import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//Servicios
import { UserService } from '../user.service';
import { DepartamentoService } from '../departamento.service';
import { CargoService } from '../cargo.service';


// Interfaces
import { User } from '../user';
import { Departamento } from '../departamento';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  operation: string = 'Registrar';
  listDepas: Departamento[] = [];
  listCargos: Cargo[] = [];

  constructor(public dialogRef: MatDialogRef<AddEditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: { operation: string, id: number }, private fb: FormBuilder, private _userService: UserService, public _depaService: DepartamentoService, public _cargoService: CargoService) {
    this.form = this.fb.group({
      usuario: ['', [Validators.required,]],
      pnombre: ['', [Validators.required,]],
      snombre: ['', [Validators.required,]],
      papellido: ['', Validators.required],
      sapellido: ['', Validators.required],
      email: ['', Validators.required],
      departamento: ['', Validators.required],
      cargo: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getListDepas();
    this.getListCargos();
    if (this.data) {
      this.operation = this.data.operation;
      this.getProduct(this.data.id);
    }
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

  onNoClick() {
    this.dialogRef.close();
  }

  getProduct(id: number) {
    this.loading = true;
    this._userService.getUser(id).subscribe((data: User) => {
      this.loading = false;
      const { usuario, pnombre, snombre, papellido, sapellido, email, departamento, cargo } = data;
      this.form.setValue({
        usuario,
        pnombre,
        snombre,
        papellido,
        sapellido,
        email,
        departamento,
        cargo
      })
    })
  }

  addUser() {
    this.loading = true;
    const user = {
      usuario: this.form.value.usuario,
      pnombre: this.form.value.pnombre,
      snombre: this.form.value.snombre,
      papellido: this.form.value.papellido,
      sapellido: this.form.value.sapellido,
      email: this.form.value.email,
      departamento: this.form.value.departamento,
      cargo: this.form.value.cargo,
    }

    if (this.operation == 'Editar') {
      this._userService.editUser(this.data.id, user).subscribe((data) => {
        this.loading = false;
        this.onNoClick();
        this._userService.getListUsers();
      })
    } else {
      this._userService.saveUser(user).subscribe((data) => {
        this.loading = false;
        this.onNoClick();
        this._userService.getListUsers();
      })
    }
  }
}
