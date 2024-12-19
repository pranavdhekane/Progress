import Form from './Components/Form/Form';
import Submission from './Components/Submission/Submission';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/Navbar/Nav';
import Hero from './Components/Hero/Hero';
import Footer from './Components/Footer/Footer';
import Charts from './Components/Charts/Charts';
import About from './Components/About/About';

function App() {

	return (
		<Router>
			<Nav />
			<Routes>
				<Route path="/" element={<Hero />} />
				<Route path="/form" element={<Form />} />
				<Route path="/charts" element={<Charts />} />
				<Route path="/submission" element={<Submission />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App

