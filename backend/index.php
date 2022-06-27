<?php
//For CORs issue fix below statements needed, not required for unit testing
//Also to get the submitted values from front end
if(!isset($unitTesting))
{
	$unitTesting = 0;
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: *');
	header("Access-Control-Allow-Headers: *");
	//Reading the values sent from API
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata,true);
	//checking all data types are valid or not
	if(isset($request))
	{
		if(!checkAllFieldsDataType($request))
		{
			$respData='[{"status": "error","message": "Datatype Mismatch"}]';
			echo json_encode($respData);	
			return;
		}
	}
	
	$request = replaceComma($request);
}
//checking whether the data file is there and if it's not there,returning error message
$fileName = "data.csv";
$fileExistsFlag = checkFileExists($fileName);
if($fileExistsFlag == 0)
{
		$resp='error';
		//if unit testing, just return value or print the return value
		if(isset($unitTesting) && $unitTesting == 1)
		{
			return $resp;
		}
		else
		{
			echo $resp;
		}
		exit;
}
	// calling respective actions based on values received.
	//calling "insertRecord" function 
	if(isset($request[0]["mode"]) && $request[0]["mode"] == "new")
	{
		$resp = insertRecord($request);
		//if unit testing, just return value or print the return value
		if(isset($unitTesting) && $unitTesting == 1)
		{
			return $resp;
		}
		else
		{
			echo $resp;
		}
	}
	//calling "updateRecord" function 
	else if(isset($request[0]["mode"]) && $request[0]["mode"] == "edit")
	{
	    $tmpArr = json_decode($postdata, true);
		
		 $resp = updateRecord($request,$tmpArr[0]["currecid"],$tmpArr[0]["currecitem"]);
		 //if unit testing, just return value or print the return value
		if(isset($unitTesting) && $unitTesting == 1)
		{
			return $resp;
		}
		else
		{
			echo $resp;
		}
	}
	//calling "deleteRecord" function 
	else if(isset($request[0]["mode"]) && $request[0]["mode"] == "del")
	{
		$resp = deleteRecord($request[0]["id"],$request[0]["item"]);
		//if unit testing, just return value or print the return value
		if(isset($unitTesting) && $unitTesting == 1)
		{
			return $resp;
		}
		else
		{
			echo $resp;
		}
	}
	else
	{
		$respData='unknown error';
		if(!isset($unitTesting))
			echo json_encode($respData);
	}
//end of reading the values sent from API

//insertRecord function which checks for duplicates and then if no duplicate, insert the record in CSV file or returns error message
function insertRecord($data)
{
	$json = $data;
	//checking key fields and if any one of them empty, returning no record available.
	if(trim($json[0]["id"]) == "" || trim($json[0]["item"]) == "")
	{
		$respData='[{"status": "error","message": "Some fields are empty."}]';
		return json_encode($respData);	
	}
	$fileName="data.csv";
	//check the unique field already exists or not in the csv file
	//if unique field doesn't exist, go ahead,open the file in write mode and insert the recd data and return success msg or don't insert and return error msg
	if (file_exists($fileName) ) 
	{
		$file = fopen($fileName, 'r');
		$recAlreadyExists = 0;
		while (($line = fgetcsv($file)) !== FALSE) {

		   if(trim($line[6]) == trim($json[0]["item"])  )
		   {
			   $recAlreadyExists = 1;
			   break;
		   }
		   if(trim($line[0]) == trim($json[0]["id"]))
		   {
			   $recAlreadyExists = 1;
			   break;
		   }  
		}//end of while
		fclose($file);
		
		if($recAlreadyExists ==0)
		{
			$newRec = '';
			foreach($json[0] as $key=>$val)
			{
				if($key =="mode")
				{
					
				}
				else
				{
					$newRec == ''?$newRec=replaceComma($val) : $newRec = $newRec.",".replaceComma($val);
				}
			}//end of foreach
			//writing the new record to the file
			try
			{
				$handle = fopen($fileName, "a");
				//removing the first field from the receieved array as it's used checking mode
				$arrChanged= array_shift($json[0]);
				fputcsv($handle, $json[0]);
				fclose($handle);
				$respData='[{"status": "success","message": "Product saved."}]';
				return json_encode($respData);
			}
			catch(Exception $e){
				$respData='[{"status": "error","message": "'.$e->getMessage().'"}]';
				return json_encode($respData);
			}
		}
		else if($recAlreadyExists ==1)
		{
			$respData='[{"status": "error","message": "Product already exists."}]';
			return json_encode($respData);
		}
		else
		{
			$respData='error';
			$respData='[{"status": "error","message": "Error occurred. Please try again."}]';
			return json_encode($respData);	
		}
	}
	else
	{
		$respData='[{"status": "error","message": "File not found."}]';
		return json_encode($respData);
	}
}
//end of insert function

//updateRecord function which checks for duplicates(for Id and SKU other than current record) and then if no duplicate, update the record in CSV file or returns error message
//also this checks for no record error as well
function updateRecord($data,$currentRecId,$currentItemVal)
{
	//checking whether any record available or not, if record is not there,return error message.
	$recordExistsVal = checkRecordExists($currentRecId,$currentItemVal);
	if($recordExistsVal==0)
	{
		$respData='[{"status": "error","message": "Record not found."}]';
		return json_encode($respData);
	}
	
	//checking whether alreay unique field value matches with other records and if so, don't update and return error msg
	$json=$data;
	$fileName="data.csv";
    $file = fopen($fileName, 'r');
	while (($line = fgetcsv($file)) !== FALSE) {
	  $itemRecAlreadyExists = 0;
	  $idRecAlreadyExists = 0;
	  //skipping currently selected record for checking for duplicate
	  if($currentRecId != $line[0] && $currentItemVal != $line[6])
	  {
		   if(trim($line[6]) == trim($json[0]["item"]))
		   {
			   $itemRecAlreadyExists = 1;
			   break;
		   }
		   if(trim($line[0]) == trim($json[0]["id"]))
		   {
			   $idRecAlreadyExists = 1;
			   break;
		   }
	  }
	}//end of while
	fclose($file);
	//if the newly entered values for unique fields are not already exist, then go ahead and update the respective record
	if($itemRecAlreadyExists == 0 && $idRecAlreadyExists == 0)
	{
		$file = fopen($fileName, 'r');
		$allRecords ='';
		while (($line = fgetcsv($file)) !== FALSE) {
		 
			$newRec = '';
			if(trim($line[0]) == $currentRecId && trim($line[6]) == $currentItemVal)
			{
				$arrChanged= array_shift($json[0]);//removing mode field from passed array
				$arrChanged= array_shift($json[0]);//removing current id field from passed array
				$arrChanged= array_shift($json[0]);//removing current item field from passed array
				foreach($json[0] as $key=>$val)
				{
					$newRec == ''?$newRec=replaceComma($val) : $newRec = $newRec.",".replaceComma($val);
				}
			}
			else
			{
				foreach($line as $key=>$val)
				{
					$newRec == ''?$newRec=replaceComma($val) : $newRec = $newRec.",".replaceComma($val);
				}//end of foreach
			}
		
		
		$allRecords == ''?$allRecords=$newRec."\n" : $allRecords = $allRecords.$newRec."\n" ;
		  
		}//end of while
		fclose($file);	
		//writing the new record to the file
		try
		{
			file_put_contents($fileName,$allRecords);
			$respData='[{"status": "success","message": "Record updated."}]';
			return json_encode( $respData);
		}
		catch(Exception $e){
			$respData='[{"status": "error","message": '.$e->getMessage().'}]';
			return json_encode( $respData);
		}	
	}
	else
	{
		$respData='[{"status": "error", "message":"Id/SKU already exists"}]';
		return json_encode( $respData);
	}
}//end of update function
//deleteRecord function delets the record in CSV file or returns error message
//if there is no record for the passed Id and SKU.
function deleteRecord($id,$itemval)
{
	$recordExistsVal = 0;
	$recordExistsVal = checkRecordExists($id,$itemval);
	//returning error message if no record found
	if($recordExistsVal==0)
	{
		$respData='[{"status": "error","message": "Record not found."}]';
		return json_encode($respData);
	}
	$allRecords='';
	$fileName="data.csv";
    $file = fopen($fileName, 'r');
	//looping through all data in the file and skipping the line which needs to be removed
	while (($line = fgetcsv($file)) !== FALSE) {
			$newRec = '';
			if(trim($line[0]) == $id && trim($line[6]) == $itemval)
			{
				//don't do anything, just skipping the current record which needs to be deleted
			}
			else
			{
				$newRec ='';
				foreach($line as $key=>$val)
				{
					$newRec == ''?$newRec=replaceComma($val) : $newRec = $newRec.",".replaceComma($val);
				}//end of foreach
				$allRecords == ''?$allRecords=$newRec."\n" : $allRecords = $allRecords.$newRec."\n" ;
			}
	}//end of while
	fclose($file);
	try
	{
		file_put_contents($fileName,$allRecords);
		$respData='[{"status": "success","message": "Record deleted."}]';
		return json_encode( $respData);
	}
	catch(Exception $e)
	{
		$respData='error '.$e->getMessage();
		return json_encode($respData);
	}	
}//end of delete function
//checking whether the CSV file is there or not.
function checkFileExists($fileName)
{
	if(file_exists($fileName) && ($handle = fopen($fileName, "r")) !== FALSE)
	{
		//closing the file handle
		fclose($handle);
		return 1;
	}
	else
	{
		return 0;
	}
}//end of function
//checking whether record exists or not for the passed Id and SKU
function checkRecordExists($idVal,$itemVal)
{
	$recordExists = 0;
	//checking key fields and if any one of them empty, returning no record available.
	if(trim($idVal) == "" || trim($itemVal) == "")
	{
		return $recordExists;
	}
	$allRecords='';
	$fileName="data.csv";
    $file = fopen($fileName, 'r');

	while (($line = fgetcsv($file)) !== FALSE) {
			if(trim($line[0]) == $idVal || trim($line[6]) == $itemVal)
			{
				$recordExists = 1;
				return $recordExists;
			}		
	}//end of while
	fclose($file);
	return $recordExists;
}//end of function
//function which checks and removes comma's (if any) in the passed values
function replaceComma($strVal)
{
	if(!is_array($strVal))
		$strVal = str_replace(",","",$strVal);
	
	return $strVal;
}//end of function
//function to check the passed value is an integer or not
function checkNumber($val)
{
	if ( ! preg_match('/^\d+$/', $val) ) 
	{
	  return 0;
	}
	else
	{
	 return 1;
	}
}//end of function
//function which checks the passed value has special characters other than Alphanumeric along with space
function checkAlphaNumeric($val)
{
	if (preg_match('/^[a-zA-Z\s]+[a-zA-Z0-9\s]+$/', $val)) 
	{
	   return 1;
	} 
	else 
	{
		return 0;
	}
}//end of function
//function which checks the data types of each of the fields and returns error message if there is a mismatch
function checkAllFieldsDataType($fieldsArr)
{

	foreach($fieldsArr[0] as $key=>$val)
	{
		if($key =="mode")
		{

		}
		else
		{
			//checking number type of fields and if number is not there, this will return error
			if($key=="id" || $key == "qty")
			{
				if(!checkNumber($val))
				{
					return 0;
				}
			}
			//checking number type of fields and if number is not there, this will return error
			if($key=="name" || $key == "state" || $key == "item")
			{
				if(!checkAlphaNumeric($val))
				{
					return 0;
				}
			}
			if($key=="amount" )
			{
				if(!is_numeric($val))
				{
					return 0;
				}
			}
		}
	}//end of foreach
	//all fields data type is ok

	return 1;
}//end of function
	
?>
