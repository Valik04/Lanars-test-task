import {useState, useEffect} from "react";

function getPrimes(num) {
    const save = [];
    const primes = [];

    for(let i = 2; i <= num; i++){
        if (!save[i]){
            primes.push(i);
            for(let j = i * 2; j <= num; j += i){
                save[j] = true;
            }
        }
    }
    return primes;
}

const initialArrayCards = getPrimes(60);

const App = () => {
    const [arrayCards, setArrayCards] = useState([])
    const [openedCards, setOpenedCards] = useState([])
    const [matched, setMatched] = useState([])

    const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]

    const shuffle = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex

        while (currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    useEffect(() => {
        setArrayCards(shuffle(pairOfArrayCards))
    }, [])

    const flipCard = (index) => () =>{
        setOpenedCards(opened => [...opened, index])
    }

    useEffect(() => {
        if(openedCards < 2) return
        const firstMatched = arrayCards[openedCards[0]];
        const secondMatched = arrayCards[openedCards[1]]

        if (secondMatched && firstMatched.id === secondMatched.id){
            setMatched([...matched, firstMatched.id])
        }

        if(openedCards.length === 2) setTimeout(() => setOpenedCards([]), 500)
    }, [openedCards])

    const handleGameRestart = () =>{
        setOpenedCards([]);
        setMatched([])
        setArrayCards(shuffle(pairOfArrayCards))
    }

  return (
    <div className="container">
        <p className='header'>Mahjong</p>
        <div className='cards'>
            {arrayCards.map((item, index) => {
                let isFlipped = false;

                if(openedCards.includes(index)) isFlipped = true
                if (matched.includes(item.id)) isFlipped = true
                return(
                    <div key={index} className={`card ${isFlipped ? `flipped` :``}`}
                         onClick={flipCard(index)}>
                        <div className='inner'>
                            <div className='front'>
                                <p>{item}</p>
                            </div>
                            <div className='back'>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

        <button className='restart' onClick={handleGameRestart}>Сбробувати знову</button>
    </div>
  );
}

export default App;
