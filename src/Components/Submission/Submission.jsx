import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '../ui/card';

function Submissions() {
	const [submissions, setSubmissions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch data from the server
		fetch('http://localhost:5000/getLatest')
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Failed to fetch submissions');
				}
			})
			.then((data) => {
				setSubmissions(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <p>Loading submissions...</p>;
	}

	return (
		<>
			<h1 className="text-3xl text-center m-4">Last 10 Submissions</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 px-1 gap-2">
				{submissions.length === 0 ? (
					<p>No submissions found.</p>
				) : (
					submissions.map((submission, index) => {
						const localDate = new Date(submission.local_date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						});
						return (
							<Card className="bg-black text-white">
								<CardHeader className="text-xl">
									<CardTitle>{localDate}</CardTitle>
								</CardHeader>
								<CardContent className="">
									<p>
										Steps: {submission.steps}
									</p>
									<p>
										Emotional Rating: {submission.emo_rate}
									</p>
									<p>
										Physical Rating: {submission.phy_rate}
									</p>
									<p>
										Intellectual Rating: {submission.int_rate}
									</p>
									<p>
										Accomplishments: {submission.accomplishments.join(', ')}
									</p>
									<p>
										Regrets: {submission.regrets.join(', ')}
									</p>
									<p>
										Other Exercises: {submission.other_exercise.join(', ')}
									</p>
								</CardContent>
								<CardFooter>
									Message: {submission.message}
								</CardFooter>
							</Card>
						);
					})
				)}
			</div >
		</>
	);
}

export default Submissions;
