import { useState } from 'react'
import styles from './Temperature.module.scss'
const Temperature = () => {
	const [temperature, setTemperature] = useState('')
	const [bgColor, setBgColor] = useState(styles.white)
	function handleTemperatureChange(e) {
		const value = e.target.value
		if (value === '') {
			setTemperature('')
		}
		const number = parseInt(e.target.value)
		if (!isNaN(number)) setTemperature(number)
		if (number <= 0) {
			setBgColor(styles.white)
		} else if (number <= 10.99) {
			setBgColor(styles.blue)
		} else if (number >= 11 && number <= 22) {
			setBgColor(styles.green)
		} else if (number > 22) {
			setBgColor(styles.red)
		}
	}
	return (
		<div>
			<div>
				<h3>
					Задача 2. З клавіатури вводиться температура. Змінювати колір фону у
					залежності від значення:
				</h3>
				<ul>
					<li>менше нуля – білий</li>
					<li>від 0 до 10 – синій,</li>
					<li>від 11 до 22 – зелений</li>
					<li>вище 22 – червоний</li>
					<li>Реалізувати з класами і стилями.</li>
				</ul>
			</div>
			<div>
				<label>
					Введіть температуру:
					<input
						type="number"
						value={temperature}
						onChange={handleTemperatureChange}
					/>
				</label>
				<div className={styles.border}>
					<div className={`${bgColor} ${styles.wrapper}`}></div>
				</div>
			</div>
		</div>
	)
}

export default Temperature
