<?php
  $sessionId   = $_POST["sessionId"];
  $serviceCode = $_POST["serviceCode"];
  $phoneNumber = $_POST["phoneNumber"];
  $text        = $_POST["text"];
  
  function getDrivers($pick, $drop){
    return [["name" => "Ivan", "car" => "Mazda 123", "number" => "AA1111", "color" => "white", "time" => "10", "cost" => "3.84"],
           ["name" => "Markus", "car" => "Opel 345", "number" => "BB2345", "color" => "green", "time" => "12", "cost" => "4.00"],
           ["name" => "Kolya", "car" => "BMW super fast", "number" => "CC1212", "color" => "black", "time" => "6", "cost" => "4.5"]];
  }

  if ($text == "") {
      $response  = "CON Pick up address: \n".$text;
  }
  else {
    $info = explode("*", $text);
    $pickup = array_shift($info);
    $dropoff = !empty($info) ? array_shift($info) : "";
    $option = !empty($info) ? array_shift($info) : "";

    if (!empty($pickup) && (empty($dropoff)) && (empty($option))){
      $response = "CON Dropp off address: \n";
    }
    else {
      $drivers = getDrivers($pickup, $dropoff);

      if (!empty($dropoff) && (empty($option))){     
        $response = "CON ";
        $response .= "Choose option: \n";
        $index = 1;
        foreach($drivers as ["name" => $name, "car"=> $car, "time" => $time, "cost" => $cost]) {
          $response .= $index.": ".$name.", ".$car.", in ".$time." min, ".$cost." euro\n";
          $index++;
        }
      }
      else {
        $driver = $drivers[intval($option-1)];
        $response = "END Your order: \nFrom ".$pickup."\nTo ".$dropoff."\n";
        $response .= $driver["name"].", ".$driver["car"].", ".$driver["number"].", ".$driver["color"]."\n";
        $response .= "It will come in ".$driver["time"]." min\n";
        $response .= "Cost ".$driver["cost"];
      }
    }
  }
  
  // Echo the response back to the API
  header('Content-type: text/plain');
  echo $response;

?>