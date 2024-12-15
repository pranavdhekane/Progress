import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';

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
	}, [submissions]);

	const deleteSubmission = async (date) => {


		try {
			const response = await fetch('http://localhost:5000/deleteSubmission', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ date }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to delete submission');
			}

			const result = await response.json();
			alert(result.message);

		} catch (error) {
			console.error('Error deleting submission:', error.message);
			alert(error.message);
		}
	};


	if (loading) {
		return <p>Loading submissions...</p>;
	}

	return (
		<>
			<div className="flex justify-center flex-wrap [&>*]:w-[90vw] lg:[&>*]:w-[30vw] md:[&>*]:w-[45vw] gap-2 my-5">
				{/* <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 px-1 gap-2"> */}
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
							<Card className="bg-zinc-900 text-white border-black border-4">
								<CardHeader className="text-lg ">
									<CardTitle>{localDate}</CardTitle>
								</CardHeader>
								<CardContent className="text-sm [&>div>span]:inline-block [&>div>span]:min-w-[50%] [&>div]:flex ">
									<div>
										<span> Steps </span> : {submission.steps}
									</div>
									<div>
										<span> Emotional Rating </span> : {submission.emo_rate}
									</div>
									<div>
										<span> Physical Rating </span> : {submission.phy_rate}
									</div>
									<div>
										<span> Intellectual Rating </span> : {submission.int_rate}
									</div>
									<div>
										<span> Accomplishments </span> : {submission.accomplishments.join(', ')}
									</div>
									<div>
										<span> Regrets </span> : {submission.regrets.join(', ')}
									</div>
									<div>
										<span> Other Exercises </span> : {submission.other_exercise.join(', ')}
									</div>
									<div>
										<span> Message </span> : {submission.message}
									</div>
								</CardContent>
								<CardFooter>
									<div className='w-full flex justify-between'>
										{/* <div>
											<Button>update</Button>
										</div> */}
										<div>
											<Button onClick={() => deleteSubmission(localDate)} className='bg-zinc-800 border-2 border-red-700 text-red-600'>Delete</Button>
										</div>
									</div>
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
