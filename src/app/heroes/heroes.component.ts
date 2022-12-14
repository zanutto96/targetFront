import { faPen, faTrashCan, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, PipeTransform, TemplateRef } from '@angular/core';
import { map, startWith, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {

  public faTrashCan = faTrashCan;
  public faPen = faPen;
  public faAdd = faAdd;

  public heroes: Hero[] = [];
  public heroes$: Observable<Hero[]>;
  public filter = new FormControl('', { nonNullable: true });
  public filter$ = this.filter.valueChanges.pipe(startWith(''));
  public filteredHeroes$: Observable<Hero[]>;

  constructor(
    private heroService: HeroService,
  ) {
    this.heroes$ = this.heroService.getHeroes()
    this.filteredHeroes$ = combineLatest(this.heroes$, this.filter$).pipe(
      map(([states, filterString]) => states.filter(state => {
        return state.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
          || state.realName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
      }))
    );

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.heroService.getHeroes();
    this.filteredHeroes$ = combineLatest(this.heroes$, this.filter$).pipe(
      map(([states, filterString]) => states.filter(state => {
        return state.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
          || state.realName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
      }))
    );
  }

  search(text: string): Hero[] {
    return this.heroes.filter(hero => {
      const term = text.toLowerCase();
      return hero.name.toLowerCase().includes(term)
        || hero.realName.toLowerCase().includes(term)
    });
  }

  newHero(_name: string, _realName: string, universe: string): void {
    let name = _name.trim();
    let realName = _realName.trim();
    if (!name || !realName) { return; }
    this.heroService.addHero({ name, realName, universe } as Hero)
      .subscribe(hero => {
        this.getHeroes()
      });
  }

  deleteHero(id_hero: number): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(id_hero).subscribe(res => this.getHeroes());
  }


  openModal(template: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    // this.modalRef.hide();
  }

  decline(): void {
    // this.modalRef.hide();
  }
}
