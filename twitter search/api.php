<?php 
header('Content-Type: application/json');
include "twitteroauth/twitteroauth.php";

$consumer_key = "pF0EKCLyqjMu8YpG2sWUq1z9j";
$consumer_secret = "szboIElRZzV9pKD4jEfBmcl8hp0oInn9ujp9ov9GXm7tKVBlqt";
$access_token = "1084739723623579648-52XfqSBubufffBuvw7GkdoIUQr1pk2";
$access_token_secret = "Gp0qhsY7GYuZgTJfeIpvUv1jrPjZlYzg2nmrw5SDrbi3N";

$twitter = new TwitterOAuth($consumer_key,$consumer_secret,$access_token,$access_token_secret);


$query = array( "q" => "#skybetgp2off OR #skybetgp2on from:Skybetgroup2",
  "result_type" => "recent",
  'count' => 1);
$results = $twitter->get('search/tweets', $query);

$resultsAr = array();

foreach ($results->statuses as $result) {
  //print_r($result);
  //  print_r($result->entities->hashtags[0]->text);
//   echo $result->user->screen_name . ": " . $result->text . "\n";
  $resultsAr[] = array("screenName" => $result->user->screen_name, "Msg" => $result->text, "hashtag" => $result->entities->hashtags[0]->text  );
}

//print_r($resultsAr);
echo json_encode($resultsAr, true);


?>
  

