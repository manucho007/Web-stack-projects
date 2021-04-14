import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("Hero Service", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe("getHero", () => {
    it("Should call get with the correct Url", () => {
      service.getHero(4).subscribe();
      const req = httpTestingController.expectOne("api/heroes/4");
      // This will returnt this data
      req.flush({ id: 4, name: "Batman", strength: 55 });
      httpTestingController.verify();
    });

    // This is one way of doing it but it's easier to do with get()
    //     it('Should call get with the correct Url',
    //     inject([HeroService,HttpTestingController],(service:HeroService,controller:HttpTestingController)=>{
    //         service.getHero(4).subscribe()
    //     }))
  });
});
