<?php
if(!isset($unitTesting))
{
	$unitTesting = 0;
	//For CORs issue fix below statements needed, not required for unit testing
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
}
$ableToReadFile=0;
$fileName = "data.csv";
//opening the CSV file to read the content
if (file_exists($fileName) && ($handle = fopen($fileName, "r")) !== FALSE) {
    $csvs = [];
    while(! feof($handle)) {
       $csvs[] = fgetcsv($handle);
    }
    $datas = [];
	//fetching column names
    $column_names = [];
    foreach ($csvs[0] as $single_csv) {
        $column_names[] = $single_csv;
    }
	$ableToReadFile = 1;
    foreach ($csvs as $key => $csv) {
	if ($key === 0 || $key == '') {
            continue;
        }
		//fetching the data and assigning to array
        foreach ($column_names as $column_key => $column_name) {
			if(isset($csv[$column_key]))
			$datas[$key-1][$column_name] = $csv[$column_key];
        }
	
    }
	//encoding the data
    $json = json_encode($datas);
	//closing the file handle
    fclose($handle);
	if($unitTesting == 0)
	{
		//printing on the screen
		print_r($json);
		exit;
	}
	else
	{
		if($ableToReadFile == 1)
		{
			$respData='success';
		}
		else
		{
			$respData='failed';
		}
		echo json_encode($respData);	
	}
}
else
{
  if($unitTesting == 0)
	{
		echo json_encode("CSV Data file not found");
	}
	else
	{
		$respData='error';
		echo json_encode($respData);	
	}
}

?>
