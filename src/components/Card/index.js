import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { selectCard } from '../../store/actions'
import './card.css'
import cat from '../../img/kot_preview.png'

export default function Card({card}) {
    const [header, setHeader] = useState(null)
    const dispatch = useDispatch()

    const clickHandler = (c) => {
        c.current = !c.current
        dispatch(selectCard(c))
    }

    const mouseLeave = (e, s) => {  
        if (e.target.className === 'card card-selected') {
            setHeader(s)
        } else if (e.target.className === 'card' &&  header) {
            setHeader(s)
        }
    }
    
    const mouseEnter = (e, s) => {
        if (e.target.className === 'card' && header) {
            setHeader(s)
        } else if (e.target.className === 'card card-selected') {
            setHeader(null)
        } 
    }

    const styles = (c) => {
        if (c.stock && !c.current) {
            return "card"
        } else if (!c.stock) {
            return 'card card-disabled'
        } else if (c.stock && c.current) {
            return 'card card-selected'
        }
    }

    const Desc = (c) => (<span className="card-desc--text">Чего сидишь? Порадуй котэ, <button>купи.</button></span>)

    return (
        <div 
            className={styles(card)} 
            onClick={() => clickHandler(card)} 
            onMouseEnter={(e) => {if(card.current){mouseEnter(e, card.title.subname)}}} 
            onMouseLeave={(e) => {if(card.current){mouseLeave(e, card.title.subname)}}} 
            key={card.title.subname}
        >
            <div className="card-text">
                <p className="card-text--top">
                    {card.current && header === card.title.subname  
                    ?  'Котэ не одобряет?' 
                    : "Сказочное заморское яство"}
                </p>
                <h1>{card.title.name}</h1>
                <h3>{card.title.subname}</h3>
                <p className="card-text--middle"><b>{card.info.porcies}</b> порций</p>
                <p className="card-text--bottom">
                    <b>{card.info.bonus === 0 ? null : card.info.bonus} </b> 
                    {card.info.bonus === 0 
                    ? 'Мышь в подарок' 
                    : (card.info.bonus <= 4) 
                        ? 'мыши в подарок' 
                        : 'мышей в подарок заказчик доволен' }
                </p>
            </div>
            <div className="card-img">
                <img src={cat} alt={`Упаковка ${card.title.subname}`}/>
                <div><p>{card.weight}</p><p>кг</p></div>
            </div>
            <p className="card-desc">
                {(card.desc && card.current) 
                ? card.desc 
                : !card.stock 
                    ? <span className="card-desc--text-sad">Печалька, {card.title.subname} закончился.</span> 
                    : Desc(card)}
            </p>
        </div>
    )
}