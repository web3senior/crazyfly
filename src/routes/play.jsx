import { useEffect, useRef, useState } from 'react'
import { useNavigate, defer, useParams } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import MaterialIcon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import Loading from './components/LoadingSpinner'
import { CheckIcon, ChromeIcon, BraveIcon } from './components/icons'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth, web3, _ } from '../contexts/AuthContext'
import styles from './Play.module.scss'
import Web3 from 'web3'
import ABI from '../abi/luckybet.json'
import party from 'party-js'
import Efrog from './../assets/frog.svg'
import Coin from './../assets/coin.svg'
import Fly from './../assets/insect.png'
import Leaf from './../assets/leaf.svg'
import clickSounds from './../assets/sounds/click.wav'
import WetTongue from './../assets/sounds/wet-tongue.m4a'
import ThrowTongue from './../assets/sounds/throw-tongue.m4a'
// import { getApp } from './../util/api'
import DappDefaultIcon from './../assets/dapp-default-icon.svg'

export const loader = async ({ request, params }) => {
  return defer({})
}

function Play({ title }) {
  Title(title)
  const [isLoading, setIsLoading] = useState(true)
  const [gameover, setGameover] = useState(false)
  // const [score, setScore] = useState(0)
  const [keyframe, setKeyframe] = useState()
  const auth = useAuth()
  const navigate = useNavigate()
  const params = useParams()

  let score = 0
  let timer = 5
  let milisecond = 1_000
  let tongue = useRef(null)
  var vw = window.innerWidth
  var vh = window.innerHeight

  const getRandomInt = (max) => {
    let res = Math.floor(Math.random() * max)
    return res
  }

  function handleMouseMove(event, tongue, tongueProperty) {
    let mouse = {
      x: event.touches ? event.touches[0].clientX : event.pageX,
      y: event.touches ? event.touches[0].clientY : event.pageY,
    }
    let dx = mouse.x - tongueProperty.cx
    let dy = mouse.y - tongueProperty.cy

    let transform = `rotate(${Math.atan2(dy, dx)}rad)`
    document.querySelector(`#tongue`).style.transform = transform
  }

  const handleTongue = (event, tongueProperty) => {
    handleMouseMove(event, '', tongueProperty)
    // console.log(event.touches ? true:false)
    let tongue = document.querySelector(`#tongue`)
    let mouse = {
      x: event.touches ? event.touches[0].clientX : event.pageX,
      y: event.touches ? event.touches[0].clientY : event.pageY,
    }
    let a = mouse.x - tongue.offsetLeft
    let b = mouse.y - tongue.offsetTop
    let c = Math.sqrt(a * a + b * b)

    //document.querySelector('#tongue').style.width = `${c}px`
    console.log(`setting property`)
    //document.querySelector('#tongue').style.width = `${c}px`
    document.querySelector('#tongue').style.setProperty('--tongue-width', `${c}px`)
    document.querySelector(`#tongue`).classList.remove(styles.HidethrowTongue)
    document.querySelector(`#tongue`).classList.add(styles.throwTongue)
    // document.querySelector(`.tongue`).style.top = `${e.offsetY}px`
    // document.querySelector(`.tongue`).style.left = `${e.offsetX}px`

    // Collision
    document.querySelectorAll(`#fly`).forEach((insect) => {
      let insectLeft = insect.offsetLeft
      let insectTop = insect.offsetTop
      let insectRight = insectLeft + insect.offsetWidth
      let insectBottom = insectTop + insect.offsetHeight

      if (mouse.x >= insectLeft && mouse.x <= insectRight && mouse.y >= insectTop && mouse.y <= insectBottom) {
        //setScore((score) => score + 1)
        score++
        document.querySelector(`.score-input`).value = score
        document.querySelector(`.score`).innerHTML = score
        insect.remove()
        playWetTongue()
      }
      // } else {
      //   playThrowTongue()
      // }
    })
  }

  const handleTongueBack = (event) => {
    console.log(event)
    document.querySelector('#tongue').style.setProperty('--tongue-width', `${0}px`)
    //document.querySelector(`#tongue`).style.width = `0`
    document.querySelector(`#tongue`).classList.remove(styles.throwTongue)
    document.querySelector(`#tongue`).classList.add(styles.HidethrowTongue)
    //document.querySelector('#tongue').style.width="0px"
  }

  const addFly = (count) => {
    let flies = []
    let keyframes = []
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img')
      img.src = Fly
      img.id = `fly`
      img.classList.add(styles.fly, `fly${i}`)
      img.style.animationName = `fly${i}`
      img.style.left = `${getRandomInt(100)}%`
      img.style.top = `${getRandomInt(50)}%`
      img.draggable = false
      img.setAttribute(`data-id`, i)

      document.querySelector(`#container`).appendChild(img)

      keyframes.push(`
@keyframes fly${i} {
  0%   {left:${getRandomInt(100)}%; top:${getRandomInt(80)}%;}
  25%  {left:${getRandomInt(100)}%; top:${getRandomInt(80)}%;}
  50%  {left:${getRandomInt(100)}%; top:${getRandomInt(80)}%;}
  75%  {left:${getRandomInt(100)}%; top:${getRandomInt(80)}%;}
  100% {left:${getRandomInt(100)}%; top:${getRandomInt(80)}%;}
}
`)
    }

    setKeyframe(keyframes)
  }

  const playWetTongue = () => {
    var audio = new Audio(WetTongue)
    audio.play()
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }
  }

  const playThrowTongue = () => {
    var audio = new Audio(ThrowTongue)
    audio.play()
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }
  }

  const playClick = () => {
    var audio = new Audio(clickSounds)
    audio.play()
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }
  }

  useEffect(() => {
    addFly(50)

    let width = 100
    let height = 4
    let tongue = document.querySelector(`#tongue`)
    tongue.width = width + 'px'
    tongue.height = height + 'px'

    let tongueProperty = {
      element: tongue,
      cx: tongue.offsetLeft - 3,
      cy: tongue.offsetTop - 3,
    }

    document.onmousemove = (e) => handleMouseMove(e, tongue, tongueProperty)
    document.ontouchmove = (e) => handleMouseMove(e, tongue, tongueProperty)

    document.onmousedown = (e) => handleTongue(e, tongueProperty)
    document.ontouchstart = (e) => handleTongue(e, tongueProperty)

    document.onmouseup = (e) => handleTongueBack(e, tongueProperty)
    document.ontouchcancel = (e) => handleTongueBack(e, tongueProperty)

    const showScore = () => {
      setGameover(true)
      alert(`Your Score: ${document.querySelector(`.score-input`).value}`)
      window.location.href = `../`
    }

    const Interval = window.setInterval(() => {
      console.log(timer)
      if (timer === 0) {
        showScore()
        // clearInterval(Interval)
      }
      timer -= 1
      document.querySelector(`.${styles.timer} span`).innerHTML = timer
    }, milisecond)
  }, [])

  return (
    <>
      <section className={`${styles.section} s-motion-slideUpIn`}>
        {keyframe && <style>{keyframe}</style>}
        <input className="score-input" type="hidden" value={0} />

        <div id={`container`} className={`__container ${styles.container}`} data-width={`xxlarge`}>
          <div className={`${styles.header} d-flex flex-row align-items-center justify-content-between`}>
            <figure className={`${styles.score}`}>
              <img src={Coin} draggable={`false`} />
              <figcaption>
                <span className="score">{score}</span>
              </figcaption>
            </figure>

            <div className={styles.timer}>
              <span>{timer}</span>
            </div>
          </div>

          <div id={`tongue`} className={styles.tongue}></div>

          <figure className={styles.frog}>
            <img src={Efrog} draggable={`false`} />
          </figure>
        </div>
      </section>
    </>
  )
}

export default Play
