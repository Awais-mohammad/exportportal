import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEvent,HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.page.html',
  styleUrls: ['./vendors.page.scss'],
})
export class VendorsPage implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  selectedFiles: FileList;
  currentFile: File;

  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://82.196.0.232/rat/upload.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.uploadFile(this.currentFile).subscribe(response => {
      if (response instanceof HttpResponse) {
        console.log(response.body);
      }
    });
  }
  ngOnInit() {
  }

}
