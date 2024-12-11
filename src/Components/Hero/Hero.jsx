import {Button} from '../ui/button';

function Hero() {

    return (
        <div className="h-[60vh] p-10 text-center content-center min-h-fit">
                <p className="text-5xl font-bold mb-5 md:text-6xl">
                    Unveil the Insights of Metro Transport!
                </p>
                <p className="opacity-90">
                    Dive into real data from metro stations and rider feedback, visualized through dynamic and interactive
                    charts. Explore the Feedback and Analysis tabs to see the insights unfold!
                </p>
                <div className='my-2'>
                    <Button className="mx-2">button1</Button>          
                    <Button className="mx-2">button2</Button>         
                </div>            
        </div>
    );
}

export default Hero