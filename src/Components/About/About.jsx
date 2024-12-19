
function About() {

    return (
        <div className="px-[10vw] py-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About Progress</h1>
            <p className="text-lg mb-3">
                Progress is a project I, <span className="font-semibold">Pranav Dhekane</span>, made for fun and as a way to implement the knowledge I gained while learning React. It started as practice for React and gradually grew as I incorporated new tools like Tailwind CSS and ShadCN UI that I learned along the way. Its primary purpose is to track personal progress and self-reflection, much like keeping a journal, but on your computer.
            </p>
            <p className="text-lg mb-3">
                Building Progress has been an incredible learning journey. It has given me valuable practical knowledge and has been a great experience to develop. This project isn’t something I’m selling—it’s a tool inspired by my daily activities to help journalize and keep track of personal growth.
            </p>
            <p className="text-lg mb-4">
                I’d be thrilled if others find it helpful and use it too, but at its heart, Progress is simply something I created out of curiosity and passion.
            </p>

            <div className="mt-10 border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
                <p className="text-lg mb-3">
                    Hi, I’m <span className="font-semibold">Pranav Dhekane</span>, a second-year BCA student with a passion for coding and learning new technologies. I learned Java and did few LeetCode questions while back and am currently expanding my skills in web development using React, Tailwind CSS, and other modern tools.
                </p>
                <p className="text-lg mb-3">
                    I enjoy creating projects that not only help me grow as a developer but also have practical applications. Progress is one such project that reflects my dedication to self-improvement and exploration in the tech world.
                </p>
                <p className="text-lg mb-3">
                    You can connect with me on:
                </p>
                <ul className=" list-disc list-inside text-md">
                    <li><a href="https://github.com/pranavdhekane" className="text-blue-600 hover:underline">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/pranavdhekane" className="text-blue-600 hover:underline">LinkedIn</a></li>
                </ul>
            </div>
        </div>

    );
}

export default About;