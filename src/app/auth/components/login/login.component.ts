import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * Método para el login con el username y password
   */
  login() {
    const user = new Usuario();
    user.nombre = this.username;
    user.password = this.password;
    this.authService.login(user).subscribe((x) => {
      if (x['data'] !== null) {
        sessionStorage.setItem('usuario_id', '1');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }, 1600);
      } else {
        alert('error');
      }
    });
  }
}
