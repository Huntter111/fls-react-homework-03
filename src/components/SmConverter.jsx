import { useState } from 'react'

const SmConverter = () => {
	const [sm, setSm] = useState('')
	const [error, setError] = useState('')
	const meters = sm / 100
	const km = sm / 100000
	const handleTargetChange = (e) => {
		const value = e.target.value
		if (value === '') {
			setSm('')
		}
		const number = parseInt(value)
		if (!isNaN(number)) {
			setError('')
			setSm(number)
		} else {
			setError('Введіть коректне значення')
		}
	}
	return (
		<div>
			<h3>
				Задача 1. З клавіатури вводиться довжина у сантиметрах. Виводити скільки
				це метрів, кілометрів.
			</h3>
			<label>
				Введіть довжину у сантиметрах
				<input
					type="number"
					value={sm}
					onChange={handleTargetChange}
				/>
			</label>
			<div>
				Сантиметрів: {sm} Метрів: {meters.toFixed(2)} Кілометрів:{' '}
				{km.toFixed(2)}
			</div>
			<div>{error ? error : ''}</div>
		</div>
	)
}

export default SmConverter
