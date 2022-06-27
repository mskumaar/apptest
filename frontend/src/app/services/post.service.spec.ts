import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostService } from './post.service';
/*
describe('PostService', () =>{
  let PRODUCTS = [
    {
           "id": 1,
           "name": "Mallikarjun H",
           "state": "KA",
           "zip": "585101",
           "amount": "100",
           "qty": "12",
           "item": "It123"
       },
       {
           "id": 2,
           "name": "Mallikarjun",
           "state": "KA",
           "zip": "585101",
           "amount": "100",
           "qty": "12",
           "item": "It123"
       }
 ];
let postService: PostService,
httpTestingController: HttpTestingController;

beforeEach(() =>{

  TestBed.configureTestingModule({
      providers: [
        PostService,
        HttpClientTestingModule
      ]
  });
  //end of TestBed
  postService = TestBed.inject(PostService);
  httpTestingController = TestBed.inject(HttpTestingController);
});
//end of before-each
   it('should retrieve all products', ()=>{

      postService.getProducts().subscribe(products => {

        expect(products).toBeTruthy();
        expect(products.length).toBe(1);


      });
      //end of postService-getProducts call

     const req = httpTestingController.expectOne('http://127.0.0.1:8080/application-test/backend/read.php');
     expect(req.request.method).toEqual("GET");
     req.flush({payload:Object.values(PRODUCTS)});
   });
   //end of it function to retrieve all products
});
//end of describe


describe('Post Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  let POSTS = [
     {
            "id": 1,
            "name": "Mallikarjun H",
            "state": "KA",
            "zip": "585101",
            "amount": "100",
            "qty": "12",
            "item": "It123"
        },
        {
            "id": 2,
            "name": "Mallikarjun",
            "state": "KA",
            "zip": "585101",
            "amount": "100",
            "qty": "12",
            "item": "It123"
        }
  ];
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

  it('should return expected posts when getposts is called', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of(POSTS));
        postService.getProducts().subscribe({
          next: (posts) => {
            expect(posts).toEqual(POSTS);
            console.log("Completed");
            done();
          },
          error: () => {
            done.fail;
          },
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      });

  });


  
});
*/