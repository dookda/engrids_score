<?php

/** PHPExcel */
require_once 'Classes/PHPExcel.php';

/** PHPExcel_IOFactory - Reader */
include 'Classes/PHPExcel/IOFactory.php';


$inputFileName = "myData.xls";  
$inputFileType = PHPExcel_IOFactory::identify($inputFileName);  
$objReader = PHPExcel_IOFactory::createReader($inputFileType);  
$objReader->setReadDataOnly(true);  
$objPHPExcel = $objReader->load($inputFileName);  

$objWorksheet = $objPHPExcel->setActiveSheetIndex(0);
$highestRow = $objWorksheet->getHighestRow();
$highestColumn = $objWorksheet->getHighestColumn();

$headingsArray = $objWorksheet->rangeToArray('A1:'.$highestColumn.'1',null, true, true, true);
$headingsArray = $headingsArray[1];

$r = -1;
$namedDataArray = array();
for ($row = 2; $row <= $highestRow; ++$row) {
    $dataRow = $objWorksheet->rangeToArray('A'.$row.':'.$highestColumn.$row,null, true, true, true);
    if ((isset($dataRow[$row]['A'])) && ($dataRow[$row]['A'] > '')) {
        ++$r;
        foreach($headingsArray as $columnKey => $columnHeading) {
            $namedDataArray[$r][$columnHeading] = $dataRow[$row][$columnKey];
        }
    }
}

//echo '<pre>';
//var_dump($namedDataArray);
//echo '</pre><hr />';

//*** Connect to MySQL Database ***//
$objConnect = mysql_connect("localhost","root","root") or die(mysql_error());
$objDB = mysql_select_db("mydatabase");
$i = 0;
foreach ($namedDataArray as $result) {
		$i++;
		$strSQL = "";
		$strSQL .= "INSERT INTO customer ";
		$strSQL .= "(CustomerID,Name,Email,CountryCode,Budget,Used) ";
		$strSQL .= "VALUES ";
		$strSQL .= "('".$result["CustomerID"]."','".$result["Name"]."' ";
		$strSQL .= ",'".$result["Email"]."','".$result["CountryCode"]."' ";
		$strSQL .= ",'".$result["Budget"]."','".$result["Used"]."') ";
		mysql_query($strSQL) or die(mysql_error());
		echo "Row $i Inserted...<br>";
}
mysql_close($objConnect);
?>