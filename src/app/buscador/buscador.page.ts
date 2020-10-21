import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MovieService } from 'src/services/movie.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
  public movieFiltradas: Array<Movie> = [];
  public movies: Array<Movie> = [];
  public numCaracteres: number = 0;
  public cargando: boolean = false;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private movieService: MovieService,
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  public getMovies() {
    for (let index = 1; index <= 5; index++) {
      this.movieService.searchMovie("amor", index).subscribe(response => {
        if (!response.Error) {
          if (response.Search.length > 0) {
            response.Search.forEach(movie => {
              this.movies.push(movie);
            });
          }
        }
        this.movies = _.orderBy(this.movies, ['Title'], ['asc']);
      })
    }
  }

  public verDetalles(movie) {
    let movieObj = JSON.stringify(movie);
    this.router.navigate(['/detalles-pelicula', movieObj]);
  }

  public search(event: CustomEvent) {
    let val = event.detail.value;
    this.numCaracteres = val.length;
    this.cargando = true;
    if (val.length > 2) {
      this.movieFiltradas = [];
      if (val && val.trim() !== '') {
        for (let index = 1; index <= 5; index++) {
          this.movieService.searchMovie(val, index).subscribe(response => {
            if (!response.Error) {
              response.Search.forEach(movie => {
                this.movieFiltradas.push(movie);
                this.movieFiltradas = _.orderBy(this.movieFiltradas, ['Title'], ['asc']);
              });
            }
            this.cargando = false;
          })
        }
      }
    } else {
      this.cargando = false;
    }
  }

  public atras() {
    this.navCtrl.back();
  }
}

interface Movie {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string,
}
