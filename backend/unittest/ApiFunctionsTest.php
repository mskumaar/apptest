<?php
use PHPUnit\Framework\Testcase;
require '../index.php';

$unitTesting = 1;

class ApiFunctionsTest extends Testcase
{
	
	//Checking CSV file exists and this will return true if file exists
	public function test_CSV_Data_File_Exists_Success()
	{
		$fileExistResp = checkFileExists("data.csv");
		if($fileExistResp == 1)
			$fileExistResponseTxt = "success";
		else
			$fileExistResponseTxt = "failed";
		
		$this->assertEquals('success',$fileExistResponseTxt);
	}
	//Checking CSV file exist fail case and this will return true if file is not found
	public function CSV_Data_File_Exists_Failed()
	{
		$fileExistResp = checkFileExists("datanotfound.csv");
		if($fileExistResp == 0)
			$fileExistResponseTxt = "success";
		else
			$fileExistResponseTxt = "failed";
		$this->assertEquals('success',$fileExistResponseTxt);		
	}
	//checking successful insert record functionality
	public function test_Checking_Insert_Record_Working_Fine()
	{
		$request[0] = array("mode"=>"new","id"=>"780","name"=>"iPhone 9 780","state"=>"NY","zip"=>"00501","amount"=>"600","qty"=> "20","item"=> "Z001780");
		$insertResponse =  insertRecord($request);
		$this->assertEquals('success',getStatusFromJson($insertResponse));
	}
	//checking successful update record functionality
	public function test_Checking_Update_Record_Working_Fine()
	{
		$tmpArr =array("currecid"=>780,"currecitem"=>"Z001780");
		$request[0] = array("mode"=>"edit","currecid"=>$tmpArr["currecid"],"currecitem"=>$tmpArr["currecitem"],"id"=>"780","name"=>"iPhone 12 New arrival","state"=>"NY","zip"=>"00501","amount"=>"600","qty"=> "200","item"=> "Z001780");
		
		$updateResponse = updateRecord($request,$tmpArr["currecid"],$tmpArr["currecitem"]);
		$this->assertEquals('success',getStatusFromJson($updateResponse));
	}
	//checking failure of insert record when sending already existing ID or Item
	public function test_Checking_Insert_Record_Fail_For_Duplicate_ID_Item()
	{
		$request[0] = array("mode"=>"new","id"=>"780","name"=>"iPhone 9 780","state"=>"NY","zip"=>"00501","amount"=>"600","qty"=> "20","item"=> "Z001780");
		$insertResponse =  insertRecord($request);
		$this->assertNotEquals('success',getStatusFromJson($insertResponse));	
	}
	//checking successful delete functionality
	public function test_Checking_Delete_Record_Working_Fine()
	{
		$request= array("mode"=>"del","id"=>"780","item"=> "Z001780");
		$delResponse = deleteRecord($request["id"],$request["item"]);
		$this->assertEquals('success',getStatusFromJson($delResponse));
	}

	//checking failure of update record when sending not existing ID and Item
	public function test_Checking_Update_Record_Fail_For_No_Record_Found_For_Non_Exist_ID_Item()
	{
		$tmpArr =array("currecid"=>999999,"currecitem"=>"Z99999");
		$request[0] = array("mode"=>"edit","currecid"=>$tmpArr["currecid"],"currecitem"=>$tmpArr["currecitem"],"id"=>"999999","name"=>"iPhone 12 New arrival","state"=>"NY","zip"=>"00501","amount"=>"600","qty"=> "200","item"=> "Z99999");
		
		$updateResponse = updateRecord($request,$tmpArr["currecid"],$tmpArr["currecitem"]);
		 $this->assertEquals('error',getStatusFromJson($updateResponse));		
	}
	//checking failure of delete record when sending not existing ID and Item
	public function test_Checking_Delete_Record_Fail_For_No_Record_Found_For_Non_Exist_ID_Item()
	{
		$request= array("mode"=>"del","id"=>"999999","item"=> "Z99999");
		$delResponse = deleteRecord($request["id"],$request["item"]);
		$this->assertEquals('error',getStatusFromJson($delResponse));		
	}
	//checking data types of values sent (all fields are having valid datatype - success case of all fields sent for insert /update record
	public function test_Checking_Datatypes_Of_Values_Sent_For_Insert__Update_Record_Success_Case()
	{
		$request[0] = array("mode"=>"new","id"=>78000,"name"=>"iPhone 978 0","state"=>"NY","zip"=>"00501","amount"=>600,"qty"=> 20,"item"=> "Z00178000");
		$datatypeCheckResponse =  checkAllFieldsDataType($request);
		$this->assertEquals(1,$datatypeCheckResponse);		
	}
	//checking data types of values sent (one of the fields is not having valid datatype - fail case sent for insert / update record
	public function test_Checking_Datatypes_Of_Values_Sent_For_Insert_Update_Record_Fail_Case()
	{
		$request[0] = array("mode"=>"new","id"=>"AA78000","name"=>"iPhone 9 780","state"=>"NY","zip"=>"00501","amount"=>"600","qty"=> "20BB","item"=> "Z00178000");
	    $datatypeCheckResponse =  checkAllFieldsDataType($request);
		$this->assertEquals(0,$datatypeCheckResponse);		
	}
}
//getting the "status" value from the json response
function getStatusFromJson($result)
{
	$result = json_decode($result,true);
	$result = json_decode($result,true);
    return $result[0]["status"];	
}
?>
