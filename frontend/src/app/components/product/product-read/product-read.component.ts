import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = []
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: `Deseja excluir esse o produto?`,
      text: `${product.name}, com o preço de ${product.price}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed && product.id) {
        this.productService.delete(product.id).subscribe(() => {
          this.productService.showMessage(`${product.name} removida com sucesso!`)
          window.location.reload();
        })
      }
    })
  }
}
