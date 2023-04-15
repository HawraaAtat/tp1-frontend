import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  template: `
    <div class="gallery">
      <div class="gallery-item" *ngFor="let image of images">
        <img [src]="image.url" alt="{{ image.name }}">
      </div>
    </div>
  `,
  styles: [
    `
      .gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .gallery-item {
        width: 30%;
        margin-bottom: 20px;
      }
      img {
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class ImageGalleryComponent {
  @Input() images: { name: string; url: string }[] = [];
}
