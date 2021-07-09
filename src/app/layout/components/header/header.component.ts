import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuarioRegistrado: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (+sessionStorage.getItem('usuario_id') != 0) {
      this.usuarioRegistrado = true;
    } else {
      this.usuarioRegistrado = false;
    }
  }

  /**
   * Metodo para cerrar la sesión actual
   */
  logout() {
    sessionStorage.removeItem('usuario_id');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
