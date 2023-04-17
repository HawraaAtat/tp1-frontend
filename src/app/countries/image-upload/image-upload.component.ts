import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../shared/country/country.service';
import jwt_decode from "jwt-decode";
import { Location } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  photoForm!: FormGroup;
  username!: string;


  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private location: Location
  ) {}


  goBack() {
    this.location.back();
  }


  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      image: ['', Validators.required]
    });

    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken) as { given_name: string };
      this.username = decodedToken.given_name;
    }
  }

  ////1
  // onSubmit(): void {
  //   const imageControl = this.photoForm.get('image');
  //   if (imageControl) {
  //     const formData = new FormData();
  //     formData.append('image', imageControl.value);
  //
  //     this.countryService.addPhoto(formData).subscribe(
  //       response => {
  //         console.log('Photo added successfully:', response);
  //         // Reset the form
  //         this.photoForm.reset();
  //       },
  //       error => {
  //         console.log('Error adding photo:', error);
  //       }
  //     );
  //   } else {
  //     // handle the case where the 'image' control is not found
  //   }
  // }

  // //2
  // selectedFile: File | null = null;
  //
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log('Selected file:', this.selectedFile);
  //   // Perform some action with the selected file
  // }
  //
  // onSubmit(event: any) {
  //   event.preventDefault();
  //   console.log('Selected file:', this.selectedFile);
  //   // Perform some action with the selected file
  // }


  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
    // Read the contents of the selected file and convert it to a data URL
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    console.log('Selected file:', this.selectedFile);
    // Perform some action with the selected file
  }


}
