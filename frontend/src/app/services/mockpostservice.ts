export class MockPostService {


    getAllProducts()
    {
         return [
        {"id":"2","name":"Mostly Slugs","state":"PA","zip":"19008","amount":"13.3","qty":"2","item":"AAH6748"},
        {"id":"3","name":"Jump Stain","state":"CA","zip":"99388","amount":"56","qty":"3","item":"MKII4400"}
         ];
     }
     //end of function
      
  getPostData() {
    return [
        {"id":"2","name":"Mostly Slugs","state":"PA","zip":"19008","amount":"13.3","qty":"2","item":"AAH6748"},
        {"id":"3","name":"Jump Stain","state":"CA","zip":"99388","amount":"56","qty":"3","item":"MKII4400"}
         ]; 
  }
  getProducts() {
    return [
        {"id":"2","name":"Mostly Slugs","state":"PA","zip":"19008","amount":"13.3","qty":"2","item":"AAH6748"},
        {"id":"3","name":"Jump Stain","state":"CA","zip":"99388","amount":"56","qty":"3","item":"MKII4400"}
         ]; 
  }

}
//end of class
