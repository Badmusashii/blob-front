import { Component, OnInit } from '@angular/core';
import { PictureService } from './picture.service';
import { Observable } from 'rxjs';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  subImage$!: Observable<any>;
  title = 'upload_image_front';
  imageToShow: any;
  isImageLoading!: boolean;
  myFile!: File;

  constructor(private pictureService: PictureService) {}

  ngOnInit(): void {
    this.getImageFromService();
    this.subImage$ = this.pictureService.getImage();
  }

  async createImageFromBlob(image: Blob) {
    let reader = await new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    });
  }

  getImageFromService() {
    this.isImageLoading = true;
    this.pictureService.getImage().subscribe({
      next: (data: Blob) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error: (error) => {
        this.isImageLoading = false;
        console.log(error);
      },
    });
  }

  onFileChange(e: any) {
    console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);
      this.pictureService.postImage(formData).subscribe((res) => {
        alert('image postée');
      });
    }
  }
}
