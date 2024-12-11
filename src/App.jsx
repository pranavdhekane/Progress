import Form from './Components/Form/Form';
import React, { useState } from 'react';
import Submission from './Components/Submission/Submission';
import Nav from './Components/Navbar/Nav';
import Hero from './Components/Hero/Hero';
import Rating from './Components/Charts/Rating';

function App() {

	return (
		<>
			<Nav/>
			{/* <Hero/>
			<Form />
			<Submission /> */}
			<div className='h-70 w-[50vw]'>
				<Rating/>
			</div>
				
		</>
	);
}

export default App

