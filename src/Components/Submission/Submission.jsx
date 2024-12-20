import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

function Submissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

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
                // Sort data by the date (newest to oldest)
                const sortedData = data.sort((a, b) => new Date(b.local_date) - new Date(a.local_date));
                setSubmissions(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    const deleteSubmission = async (date) => {
        if (confirm("Are you sure!!")) {
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
        }
    };

    // Get the submissions for the current page
    const indexOfLastSubmission = currentPage * itemsPerPage;
    const indexOfFirstSubmission = indexOfLastSubmission - itemsPerPage;
    const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <p>Loading submissions...</p>;
    }

    const totalPages = Math.ceil(submissions.length / itemsPerPage);

    return (
        <>
            <div className="flex justify-center flex-wrap [&>*]:w-[90vw] lg:[&>*]:w-[30vw] md:[&>*]:w-[45vw] gap-4 my-5 min-h-[75vh]">
                {submissions.length === 0 ? (
                    <p>No submissions found.</p>
                ) : (
                    currentSubmissions.map((submission, index) => {
                        const localDate = new Date(submission.local_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        });
                        return (
                            <Card key={index} className="bg-zinc-900 text-white border-black border-4 min-h-[50vh]">
                                <CardHeader className="text-lg ">
                                    <CardTitle className='flex justify-between items-center'>
                                        {localDate}
                                        <Button onClick={() => deleteSubmission(localDate)} className="bg-zinc-800 border-2 border-red-700 text-red-600 w-fit">Delete</Button>
                                    </CardTitle>
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
                            </Card>
                        );
                    })
                )}
            </div>

            <div className='bg-black mx-10 my-3 text-white px-3 py-2 rounded-lg'>

                <Pagination >
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) paginate(currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        paginate(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) paginate(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}

export default Submissions;
