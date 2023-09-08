import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Componentes
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

// Servicios
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'nombres', 'apellidos', 'departamento', 'cargo', 'email', 'acciones'];
  loading: boolean = false;

  constructor(public _userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._userService.getListUsers();
  }

  editUser(id: number) {
    this.dialog.open(AddEditUserComponent, {
      height: '65%',
      width: '35%',
      data: { operation: 'Editar', id }
    });
  }

  deleteUser(id: number) {
    this.loading = true;
    this._userService.deleteUser(id).subscribe((data) => {
      this._userService.getListUsers();
    });
  }
}
