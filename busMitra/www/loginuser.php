
<!DOCTYPE html>
<html>
<body>
<table border="1">
    <tr>
    	<th>Bus Number</th>
		<th>Timings</th>
		<th>Roundtrip</th>
		<th>Number of Buses</th>
		<th>Stops</th>
	</tr>
	<?php
	$servername="localhost";
$username="root";
$password="";
	$dbname="busmitra";
	$numb=$_POST['name'];
	$numb1=$_POST['pass'];
	//connection to mysql
	$conn=mysqli_connect($servername, $username, $password,$dbname); //server , username , password
	//mysqli_select_db("Hospital");
	
	$syyl = "SELECT * from bus where source='$numb' and destination='$numb1'";
$result = mysqli_query($conn, $syyl);
	$no = 1;
	while($data = mysqli_fetch_assoc($result)){
		echo '
		<tr>
			<td>'.$data['codeword'].'</td>
			<td>'.$data['departure_time'].'</td>
			<td>'.$data['roundtrips'].'</td>
			<td>'.$data['num_of_buses'].'</td>
			<td>'.$data['stops'].'</td>
		</tr>'
		;
		$no++;
	}
	?>
</table>
<button type = "submit" name="search" Class="btn btn-success"><a href="http://localhost/loghtm.html">BACK</a></button>
</body>
</html>
