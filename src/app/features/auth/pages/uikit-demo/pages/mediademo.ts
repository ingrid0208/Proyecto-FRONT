import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { PhotoService } from '../../../../../core/services/utils/photo.service';
import { Product, ProductService } from '../../../../../core/services/product.service';

@Component({
    selector: 'app-media-demo',
    standalone: true,
    imports: [CommonModule, CarouselModule, ButtonModule, GalleriaModule, ImageModule, TagModule],
    templateUrl: './mediademo.html',
    providers: [ProductService, PhotoService]
})
export class MediaDemo implements OnInit {
infracciones: any[] = [
  { name: 'Mal parqueo', image: 'mal-parqueo.jpg', value: 390000, status: 'LEY 1801' },
  { name: 'Conducir usando el celular', image: 'celular.jpg', value: 522000, status: 'PREVENCIÓN' },
  { name: 'No usar casco', image: 'sin-casco.jpg', value: 499000, status: 'REINCIDENTE' },
  { name: 'Exceso de velocidad', image: 'velocidad.jpg', value: 580000, status: 'ALTA_FRECUENCIA' }
];

getTagColor(status: string): string {
  switch (status) {
    case 'LEY 1801': return 'LEY';
    case 'REINCIDENTE': return 'REINCIDENTE';
    case 'PREVENCIÓN': return 'PREVENCIÓN';
    case 'ALTA_FRECUENCIA': return 'ALTA_FRECUENCIA';
    default: return '';
  }
}
    products!: Product[];

    images!: any[];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(
        private productService: ProductService,
        private photoService: PhotoService
    ) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

        this.photoService.getImages().then((images) => {
            this.images = images;
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'success';
        }
    }
}
