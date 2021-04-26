import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Component (Deep Test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "Batman", strength: 55 },
      { id: 2, name: "Superman", strength: 90 },
      { id: 3, name: "Wonder Woman", strength: 85 },
    ];
    // Creating mock service
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Run ngOnInit
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    expect(heroComponentsDEs.length).toEqual(3);
    expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual("Batman");
  });

  //   We can loop and check the value of child component
  it("Should display the correct name in the Hero Component", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Run ngOnInit
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    for (let i = 0; i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  // Testing DOM interactions one way
  it(`Should call heroService.deleteHero when the Hero Component's delete button is clicked - Triggering an event  `, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // This watches if the method is invoked
    spyOn(fixture.componentInstance, "delete");

    // Run ngOnInit
    fixture.detectChanges();

    // Access the properties from the child component
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponents[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });

    // Check if the method have been called with the proper hero
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  // Testing DOM interactions another way
  it(`Should call heroService.deleteHero when the Hero Component's delete button is clicked - using emit()`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // This watches if the method is invoked
    spyOn(fixture.componentInstance, "delete");

    // Run ngOnInit
    fixture.detectChanges();

    // Access the properties from the child component
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    // or this works just as well
    heroComponents[0].triggerEventHandler("delete", null);

    // Check if the method have been called with the proper hero
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it("Should add a new hero to the hero list when the add button is clicked", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // Run ngOnInit
    fixture.detectChanges();
    const name = "Mr Ice";
    mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 10 }));
    // Simulates typing a name in the input field
    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css("button"))[0];
    inputElement.value = name;

    addButton.triggerEventHandler("click", null);

    fixture.detectChanges();
    // Check if the new list contains the value just added
    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;
    expect(heroText).toContain(name);
  });
});
