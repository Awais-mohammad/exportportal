import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  width = window.innerWidth;
  activePath: string;
  pages: any[] = ['home', 'animations', 'products', 'community', 'about', 'contact'];
  constructor(
    private router: Router,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  async checkRoute() {
    setInterval(() => {
      this.activePath = this.router.url.slice(1, this.router.url.length);
    }, 100)
  }

  ngOnInit() {
    this.checkRoute();
  }

  goToPage(path: string) {
    this.router.navigate([path]).then(() => {
      this.activePath = this.router.url.slice(1, this.router.url.length);
      console.log(this.activePath);
    });
  }

}
