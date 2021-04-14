import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe("Hero Component (Shallow Tests)", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      // We tell to not error if encounter an unknowkn attribute or an uknown element
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it("Should have the correct hero", () => {
    fixture.componentInstance.hero = { id: 1, name: "Batman", strength: 55 };

    expect(fixture.componentInstance.hero.name).toEqual("Batman");
  });
  it("Should render the hero name in an anchor tag", () => {
    fixture.componentInstance.hero = { id: 1, name: "Batman", strength: 55 };

    fixture.detectChanges();

    // At the beginning is an empty string, after the ngOnInit gets the hero, it requires detectChanges
    // expect(fixture.nativeElement.querySelector("a").textContent).toContain(
    //   "Batman"
    // );

    // We could do the same with debugElement
    let de = fixture.debugElement.query(By.css("a"));
    expect(de.nativeElement.textContent).toContain("Batman");
  });
});
