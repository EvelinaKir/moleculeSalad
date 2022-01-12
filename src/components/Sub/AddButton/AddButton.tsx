import { FC } from "react"
import style from './addButton.module.scss'
import roundAdd from '../../../images/roundAdd.svg'

export const AddButton:FC<{action:any}> = ({action}) => {
    return (
        <img className={style.add} src={roundAdd} onClick={() => action()} alt="add to basket" />
    )
}