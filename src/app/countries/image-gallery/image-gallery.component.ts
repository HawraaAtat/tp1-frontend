import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  template: `
    <div class="gallery-container">
      <div class="gallery">
        <div class="gallery-item" *ngFor="let image of images">
          <img [src]="image.url" alt="{{ image.name }}">
        </div>
      </div>
      <button class="prev-btn"><ion-icon name="chevron-back-outline"></ion-icon></button>
      <button class="next-btn"><ion-icon name="chevron-forward-outline"></ion-icon></button>
    </div>
  `,
  styles: [
    `
      .gallery-container {
        position: relative;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
      }

      .gallery {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
      }

      .gallery-item {
        width: 150px;
        height: 100px;
        margin: 10px;

        flex-shrink: 0;
      }

      .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .prev-btn,
      .next-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        font-size: 1.5rem;
        color: #000;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
      }

      .prev-btn {
        left: 10px;
        background: none;
        -webkit-mask-image: none;
      }

      .prev-btn::before {
        content: '';
        position: absolute;
        top: -35px;
        left: -25px;
        width: 125px;
        height: 110px;
        background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      }


      .next-btn {
        right: 10px;
        background: none;
        -webkit-mask-image: none;
      }

      .next-btn::before {
        content: '';
        position: absolute;
        top: -35px;
        right: -25px;
        width: 125px;
        height: 110px;
        margin: 0;
        background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      }

      .next-btn:focus, .prev-btn:focus {
        outline: none;
      }
    `,
  ],
})
export class ImageGalleryComponent {
  @Input() images: { name: string; url: string }[] = [];

  galleryWidth!: number;
  gallery!: HTMLElement;

  constructor() { }

  ngAfterViewInit() {
    this.gallery = document.querySelector('.gallery') as HTMLElement;
    if (this.gallery) {
      this.galleryWidth = this.gallery.offsetWidth;

      const prevBtn = document.querySelector('.prev-btn') as HTMLElement;
      const nextBtn = document.querySelector('.next-btn') as HTMLElement;

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          this.onPrevClick();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.onNextClick();
        });
      }
    }
  }

  onPrevClick() {
    if (this.gallery) {
      this.gallery.scrollLeft -= this.galleryWidth;
    }
  }

  onNextClick() {
    if (this.gallery) {
      this.gallery.scrollLeft += this.galleryWidth;
    }
  }
}
