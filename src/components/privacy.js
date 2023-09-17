
import {
  Typography,
  TextField,
  Button,
  Container,
  Tab,
  Tabs,
  Grid,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  IconButton,
  Box
} from "@mui/material";

const Privacy = () => {
//	const api_key = "AIzaSyCek4mNqWRbNNxT9_FhoRk4bdS3MwiYHOo"

//	const base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?place_id={place_id}&radius=10000&maxresults=10&type=restaurant&key={api_key}"
	
	const generate_query = () => {
		fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=26.1247154,-80.3747858&radius=10000&maxresults=10&type=restaurant&key=AIzaSyCek4mNqWRbNNxT9_FhoRk4bdS3MwiYHOo')
		.then(response => response.json())
		.then(data => console.log(data))
	}
	
	
	
	return (
		<h1>
			Hello world!!
			<Button onClick={generate_query}>
				Click Me
			</Button>
		</h1>
	);
}

export default Privacy;