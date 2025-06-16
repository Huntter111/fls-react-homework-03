import { useEffect, useState } from 'react'

import styles from './Translator.module.scss'
import { shuffleArray } from '../../utils/shuffleArray'
import clsx from 'clsx'
const wordsData = [
	{ id: 0, en: 'table', ua: 'стіл' },
	{ id: 1, en: 'car', ua: 'автомобіль' },
	{ id: 2, en: 'bus', ua: 'автобус' },
	{ id: 3, en: 'man', ua: 'чоловік' },
	{ id: 4, en: 'boy', ua: 'хлопець' },
	{ id: 5, en: 'girl', ua: 'дівчина' },
	{ id: 6, en: 'house', ua: 'будинок' },
	{ id: 7, en: 'tree', ua: 'дерево' },
	{ id: 8, en: 'book', ua: 'книга' },
	{ id: 9, en: 'phone', ua: 'телефон' },
	{ id: 10, en: 'computer', ua: "комп'ютер" },
	{ id: 11, en: 'water', ua: 'вода' },
]

const Translator = () => {
	const [englishWords, setEnglishWords] = useState(() => [])
	const [ukrainianWords, setUkrainianWords] = useState(() => [])
	const [selectedEnWord, setSelectedEnWord] = useState(null)
	const [selectedUaWord, setSelectedUaWord] = useState(null)

	// const [border, setBorder] = useState(null)
	const [buttonDisabled, setButtonDisabled] = useState(false)
	const [reset, setReset] = useState(false)
	const isMatch =
		selectedEnWord &&
		selectedUaWord &&
		wordsData.find(
			(word) =>
				word.en === selectedEnWord.word && word.ua === selectedUaWord.word,
		)

	useEffect(() => {
		const enWords = wordsData.map((wordItem) => ({
			id: wordItem.id,
			word: wordItem.en,
		}))
		const uaWords = wordsData.map((wordItem) => ({
			id: wordItem.id,
			word: wordItem.ua,
		}))
		setEnglishWords(shuffleArray(enWords))
		setUkrainianWords(shuffleArray(uaWords))
		setReset(false)
	}, [reset])
	useEffect(() => {
		let timerId
		function checkWords() {
			if (selectedEnWord !== null && selectedUaWord !== null) {
				setButtonDisabled(true)
				const findWord = wordsData.find(
					(word) => word.en === selectedEnWord.word,
				)
				if (
					selectedEnWord.word === findWord.en &&
					selectedUaWord.word === findWord.ua
				) {
					timerId = setTimeout(() => {
						setEnglishWords((prev) =>
							prev.filter((item) => item.word !== selectedEnWord.word),
						)
						setUkrainianWords((prev) =>
							prev.filter((item) => item.word !== selectedUaWord.word),
						)
						setSelectedEnWord(null)
						setSelectedUaWord(null)

						setButtonDisabled(false)
					}, 700) // Для візуального відображення перевірки
				} else {
					setButtonDisabled(true)
					timerId = setTimeout(() => {
						setSelectedEnWord(null)
						setSelectedUaWord(null)
						setButtonDisabled(false)
					}, 1000)
				}
			}
		}
		checkWords()
		return () => {
			clearTimeout(timerId)
		}
	}, [selectedEnWord, selectedUaWord])

	function handleSelectedEnWord(id) {
		const findWord = englishWords.find((word) => word.id === id)
		setSelectedEnWord((prevEn) =>
			prevEn?.id === findWord.id ? null : findWord,
		)
	}
	function handleSelectedUaWord(id) {
		const findWord = ukrainianWords.find((word) => word.id === id)
		setSelectedUaWord((prevUa) =>
			prevUa?.id === findWord.id ? null : findWord,
		)
	}
	return (
		<div className="container">
			<div>
				<h3 className="title">
					Задача 9. <br /> Перекладач. Користувачу виводять змішані картки з
					словами на англійській і українській мові. <br /> Користувач поступово
					клікає на картки (виділяємо синьою рамкою). <br /> Якщо знайдено
					правильні пари карток, що відповідають одному слову, то видаляємо ці
					картки. <br /> Інакше - виділяємо червоною рамкою і через секунду
					забираємо рамку.
				</h3>
			</div>
			<h2>Знайдіть пари слів</h2>
			<div className={styles.lists}>
				<ul>
					{englishWords.map((word) => (
						<li
							key={word.id}
							className={styles.item}
						>
							<button
								disabled={buttonDisabled}
								className={clsx(
									styles.button,
									selectedEnWord?.id === word.id && styles.borderBlue,
									selectedEnWord?.id === word.id &&
										selectedUaWord &&
										(isMatch ? styles.green : styles.red),
								)}
								onClick={() => handleSelectedEnWord(word.id)}
							>
								{word.word}
							</button>
						</li>
					))}
				</ul>
				<ul>
					{ukrainianWords.map((word) => (
						<li
							key={word.id}
							className={styles.item}
						>
							<button
								disabled={buttonDisabled}
								className={clsx(
									styles.button,
									selectedUaWord?.id === word.id && styles.borderBlue,
									selectedUaWord?.id === word.id &&
										selectedEnWord &&
										(isMatch ? styles.green : styles.red),
								)}
								onClick={() => handleSelectedUaWord(word.id)}
							>
								{word.word}
							</button>
						</li>
					))}
				</ul>
			</div>
			{englishWords.length === 0 && (
				<div>
					<h4>Слова закінчились перемішати заново?</h4>
					<button
						onClick={() => setReset(true)}
						className={styles.reset}
					>
						Перемішати
					</button>
				</div>
			)}
		</div>
	)
}

export default Translator
