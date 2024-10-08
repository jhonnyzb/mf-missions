import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, mergeMap } from "rxjs";

@Injectable({providedIn: "root"})
export class UtilsTitle {
    constructor( private router: Router, private titleService: Title){}

    suscribeRoutesTitle(){
        this.router.events.pipe(
          filter((event)=> event instanceof NavigationEnd),
          map(()=> this.router.routerState.root),
          map((root: any)=>{
            let route = root;
            while (route.firstChild) {
              route = route.firstChild;
            }
            return route;
          }),
          mergeMap((route: any) => route.data)).subscribe((event: any)=> { 
            this.titleService.setTitle(event.title)
          }) ;
      }
}