import { useState, useEffect } from 'react';
import home from "../Assets/Icons/home.png"
import forecast from "../Assets/Icons/forecast.png";
import search from "../Assets/Icons/search.png"
import { useNavigate } from "react-router-dom";
import moment from 'moment';

export default function SideNavBar() {
    const navigate = useNavigate();
    const [time, setTime] = useState(moment().format('hh:mm'));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().format('hh:mm'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function navigateToPage(event, type) {

        switch (type) {
            case "home":
                navigate("/")
                break;
            case "forecast":
                navigate("/forecast") 
                break;
            case "search":
                navigate("/search")
                break;
            default:
        }
    }

    return (<>
        <div className="sideNav">
            <nav>
                <h1>{time}</h1>

                <div className='buttons'>
                    <div>
                        <button onClick={(event) => navigateToPage(event, "home")}><img src={home} alt='Home' width={50} /></button>
                        <button onClick={(event) => navigateToPage(event, "forecast")}><img src={forecast} alt='Forecast' width={50} /></button>
                        <button onClick={(event) => navigateToPage(event, "search")}><img src={search} alt='Search' width={50} /></button>
                    </div>
                </div>
            </nav>
           
        </div>
        </>
    )
}