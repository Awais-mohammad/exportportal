import { Component, OnInit,HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private titleService: Title,
    ) { }
  width = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }
  
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.titleService.setTitle("About us - Export Portal");
    try {
      document.querySelector("meta[name='description']").remove();
    } catch (e) {
    }
    try {
      document.querySelector("meta[name='keywords']").remove();
    } catch (e) {

    }

    var keywords = document.createElement('meta');
    keywords.name = "keywords";
    keywords.content = "export portal, export portal pakistan, exportportal pk, exporters list pakistan, pakistan exporters ";
    document.getElementsByTagName('head')[0].appendChild(keywords);
  }

}
