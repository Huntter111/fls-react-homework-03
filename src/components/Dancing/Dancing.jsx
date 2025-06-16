import { useState } from 'react'
import styles from './Dancing.module.scss'
const dataMens = [
	{
		id: 1,
		name: 'Іван',
	},
	{
		id: 2,
		name: 'Петро',
	},
	{
		id: 3,
		name: 'Степан',
	},
	{
		id: 4,
		name: 'Олег',
	},
]
const dataWomens = [
	{
		id: 1,
		name: 'Оксана',
	},
	{
		id: 2,
		name: 'Наталія',
	},
	{
		id: 3,
		name: 'Тетяна',
	},
]
const Dancing = () => {
	const [mens, setMens] = useState(() => dataMens)
	const [women, setWomen] = useState(() => dataWomens)
	const [selectedMan, setSelectedMan] = useState(null)
	const [selectedWoman, setSelectedWoman] = useState(null)
	const [selectedPairs, setSelectedPairs] = useState(() => [])

	function handleSelectedMan(id) {
		const findMan = mens.find((man) => man.id === id)
		setSelectedMan((man) => (man?.id === findMan.id ? null : findMan))
	}
	function handleSelectedWoman(id) {
		const findWoman = women.find((woman) => woman.id === id)
		setSelectedWoman((woman) => (woman?.id === findWoman.id ? null : findWoman))
	}
	function addPairs() {
		if (selectedMan !== null && selectedWoman !== null) {
			setSelectedPairs((prev) => [
				...prev,
				{
					id: new Date().getTime(),
					man: selectedMan,
					woman: selectedWoman,
				},
			])
			setMens((prev) => prev.filter((man) => man.id !== selectedMan.id))
			setWomen((prev) => prev.filter((woman) => woman.id !== selectedWoman.id))
			setSelectedMan(null)
			setSelectedWoman(null)
		}
	}
	const disabledButton =
		selectedMan == null ||
		selectedWoman == null ||
		mens.length === 0 ||
		women.length === 0
	return (
		<div className="container">
			<div>
				<h3>
					Задача 6. Пари для танців. Поступово вибираємо хлопця, дівчину і
					додаємо у обрані пари. Пару можна видалити. Поки не вибрано хлопця і
					дівчину кнопка «Додати» заблокована. Якщо не вистачає хлопців або
					дівчат вибір також блокується.
				</h3>
			</div>
			<div className={styles.lists}>
				<div className={styles.blockItem}>
					<h4>Хлопці</h4>
					<ul className={styles.list}>
						{mens.length !== 0 ? (
							mens.map((man) => (
								<li
									key={man.id}
									className={styles.item}
								>
									<button
										className={`${styles.button} ${
											selectedMan?.id === man.id ? styles.borderBlue : ''
										}`}
										onClick={() => handleSelectedMan(man.id)}
									>
										{man.name}
									</button>
								</li>
							))
						) : (
							<li>Немає хлопців для вибору</li>
						)}
					</ul>
				</div>
				<div className={styles.blockItem}>
					<h4>Дівчата </h4>
					<ul className={styles.list}>
						{women.length !== 0 ? (
							women.map((w) => (
								<button
									key={w.id}
									className={`${styles.button} ${
										selectedWoman?.id === w.id ? styles.borderBlue : ''
									}`}
									onClick={() => handleSelectedWoman(w.id)}
								>
									{w.name}
								</button>
							))
						) : (
							<li>Немає дівчат для вибору</li>
						)}
					</ul>
				</div>
			</div>
			<div>
				<button
					onClick={addPairs}
					className={styles.addButton}
					disabled={disabledButton}
				>
					Додати
				</button>
			</div>
			<div>
				<h4>Обрані пари</h4>
				<div className={styles.pairs}>
					{selectedPairs.map((pair) => (
						<div key={pair.id}>
							{pair.man.name} - {pair.woman.name}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Dancing
