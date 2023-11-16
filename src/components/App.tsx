import {MouseEventHandler, useState} from 'react';
import s from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import ImgPNG from '@/assets/spider.png';
import ImgJPG from '@/assets/home.jpg';
import Rain from '@/assets/rain.svg'
import {calc} from "@/test";

const App = () => {
    const [count, setCount] = useState<number>(0)

    const increment:MouseEventHandler<HTMLButtonElement>=(e)=>{
        setCount(prev => prev+1)
    }
    //console.log(calc('5',9))
    return (
        <div>
            <h1>PLATFORM </h1>
            {__PLATFORM__==='mobile' && <h2>it's mobile</h2>}
            {__PLATFORM__==='desktop' && <h2>it's comp</h2>}
            <div>
                <Link to={'/about'} >About</Link>
                &nbsp;
                <Link to={'/shop'} >Shop</Link>
            </div>
            <Outlet />
            <img src={ImgPNG} alt={'png'} width={50} height={50} />
            <img src={ImgJPG} alt={'jpg'} width={120} height={50}  />
            <Rain fill={'red'} width={50} height={50}  color={'blue'} />
            <h1 className={s.value}>{count}</h1>
            <button onClick={increment} className={s.button}>
                click
            </button>

        </div>
    );
};

export default App;