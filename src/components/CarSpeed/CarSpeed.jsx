import { useState } from 'react'
import styles from './CardSpeed.module.scss'
const CarSpeed = () => {
	const [limitSpeed, setLimitSpeed] = useState('')
	const [currentSpeed, setCurrentSpeed] = useState('')
	const [bgColor, setBgColor] = useState('')
	const [warning, setWarning] = useState('')

	const fiftyPercent = parseInt(limitSpeed) * 0.5
	const ninetyPercent = parseInt(limitSpeed) * 0.9
	function changeWarning(num) {
		if (num > ninetyPercent) {
			setWarning('УВАГА!')
		} else {
			setWarning('')
		}
	}
	function changeBgInput(num) {
		if (num < fiftyPercent) {
			setBgColor(styles.orange)
		} else if (num <= limitSpeed) {
			setBgColor(styles.green)
		} else if (num >= limitSpeed) {
			setBgColor(styles.red)
		}
	}
	function handleCurrentSpeed(e) {
		const val = e.target.value
		if (val === '') {
			setCurrentSpeed('')
			setBgColor('')
			setWarning('')
		}
		const number = parseInt(val)
		if (!isNaN(number)) {
			setCurrentSpeed(number)
			changeBgInput(number)
			changeWarning(number)
		}
	}
	return (
		<div>
			<div>
				<h3>
					Задача 3. Вводиться дозволена швидкість і поточна швидкість авто. Якщо
					не введено дозволену швидкість, то елемент введення поточної швидкості
					заблокований. Якщо швидкість менше 50% дозволеної, то колір input –
					оранжевий, якщо від 50% до 100% - зелений, вище 100% - червоний. Якщо
					значення вище 90% починає блимати повідомлення «Увага!»
				</h3>
			</div>
			<div>
				<label>
					Дозволена швидкість:
					<input
						type="number"
						value={limitSpeed}
						onChange={(e) => setLimitSpeed(e.target.value)}
					/>
				</label>
				<label>
					Поточна швидкість:
					<input
						disabled={!limitSpeed}
						type="number"
						value={currentSpeed}
						className={`${bgColor}`}
						onChange={handleCurrentSpeed}
					/>
				</label>
			</div>
			<div className={styles.warning}>{warning}</div>
		</div>
	)
}

export default CarSpeed
