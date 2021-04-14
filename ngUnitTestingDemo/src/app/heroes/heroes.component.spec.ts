import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Component", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "Batman", strength: 55 },
      { id: 2, name: "Superman", strength: 90 },
      { id: 3, name: "Wonder Woman", strength: 85 },
    ];

    //   Create the mock service with all the methods we required
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    //   We pass the mock service
    component = new HeroesComponent(mockHeroService);
  });

  //   State based test
  describe("Delete", () => {
    it("should remove the indicated hero from the heroes list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    // This one is an interaction test
    it("Should call deleteHero with the corresponding hero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
