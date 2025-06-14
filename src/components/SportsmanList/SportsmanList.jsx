import { useState } from 'react'
import styles from './Sportsman.module.scss'

const generalData = [
	{
		id: 1,
		person: 'John Depp',
	},
	{
		id: 2,
		person: 'Sara Wik',
	},
	{
		id: 3,
		person: 'Den Miro',
	},
	{
		id: 4,
		person: 'Alan Woo',
	},
]
const competitionData = [
	{
		id: 5,
		person: 'Olga Sich',
	},
	{
		id: 6,
		person: 'Ivan Hal',
	},
]
const SportsmanList = () => {
	const [generalList, setGeneralList] = useState(() => generalData)
	const [competitionList, setCompetitionList] = useState(() => competitionData)

	function handleChangeGeneral(id) {
		const item = generalList.find((el) => el.id === id)
		setGeneralList((prevGeneralList) =>
			[...prevGeneralList].filter((el) => el.id !== id),
		)
		setCompetitionList((prev) => [...prev, item])
	}
	function handleChangeCompetition(id) {
		const item = competitionList.find((el) => el.id === id)
		setCompetitionList((prev) => [...prev].filter((el) => el.id !== id))
		setGeneralList((prev) => [...prev, item])
	}
	return (
		<div>
			<div>
				<h3>
					Задача 5. Дано список спортсменів. Потрібно сформувати список тих, які
					будуть брати участь у змаганні. При цьому є два стовпці. В одному
					відображені всі спортсмени, в іншому – список тих, хто був вибраний.
					При натисканні на зелену стрілку спортсмен переміщається у список для
					змагань. При натисканні на червону стрілку спортсмен переміщається у
					загальний список.
				</h3>
			</div>
			<div className={styles.lists}>
				<div>
					<h2>Загальний список</h2>
					<ul className={styles.list}>
						{!generalList.length && (
							<li className={styles.item}>Загальний список порожній</li>
						)}
						{generalList.map((el) => (
							<li
								key={el.id}
								className={styles.item}
							>
								{el.person}{' '}
								<button
									className={styles.greenButton}
									onClick={() => handleChangeGeneral(el.id)}
								>
									➡
								</button>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h2>Обрані для змагання</h2>
					<ul className={styles.list}>
						{competitionList.length === 0 && (
							<li className={styles.item}>Немає обраних для змагань</li>
						)}
						{competitionList.map((el) => (
							<li
								key={el.id}
								className={styles.item}
							>
								<span>{el.person}</span>
								<button
									className={styles.redButton}
									onClick={() => handleChangeCompetition(el.id)}
								>
									⬅
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SportsmanList
