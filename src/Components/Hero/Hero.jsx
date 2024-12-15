import {Button} from '../ui/button';

function Hero() {

    return (
        <div className="h-[75vh] p-10 text-center content-center min-h-fit">
                <p className="text-5xl font-bold mb-5 md:text-6xl">
                    Track Your Progress, Your Way!
                </p>
                <p className="opacity-90">
                    Log your thoughts, rate your day, and track your progress—all offline, secure, and just for you. See your journey unfold with beautiful visualizations.    
                </p>
                <div className='my-2'>
                    <Button className="mx-2"onClick={()=>{window.location.href = 'http://localhost:5173/form';}}>
                        Add Your Thoughts
                    </Button>          
                    <Button className="mx-2" onClick={()=>{window.location.href = 'http://localhost:5173/charts'}}>View Progress</Button>         
                </div>            
        </div>
    );
}

export default Hero