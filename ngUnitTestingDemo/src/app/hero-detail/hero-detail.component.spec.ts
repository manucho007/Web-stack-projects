import { Location } from "@angular/common";
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";

describe("Hero Detail component", () => {
  let mockActivatedRoute;
  let mockLocation;
  let mockHeroService;
  let fixture: ComponentFixture<HeroDetailComponent>;
  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    TestBed.configureTestingModule({
      // It's easy to just import the forms module
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        { provide: HeroService, useValue: mockHeroService },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 100 })
    );
  });

  it("Should render hero name in a h2 tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "SUPERDUDE"
    );
  });

  //   Async test
  it("Should call updateHero when save is called w/fakeasync", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    // Call save
    fixture.componentInstance.save();
    // fast forward 250 ms
    // tick(250);
    // Flush is for when we don't know how much time do we need
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it("Should call updateHero when save is called w/async", async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    // Call save
    fixture.componentInstance.save();

    // This waits until all promises get resolved to call what's inside
    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));
});
