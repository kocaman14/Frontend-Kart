import { useRef, useState } from 'react'
import './styles.css'
import Header from './components/Header'
import FrontMessage from './components/FrontMessage'
import InnerMessage from './components/InnerMessage'

export default function App() {
  /* Challenge

	Kullanıcı kartın kapağına tıkladığında kart açılır ve kapanır, ancak kart şirketi daha sofistike bir kontrol yöntemi istiyor. Kullanıcının mouse ile parmağını kaydırmasını taklit eden bir yöntem. Göreviniz aşağıdaki gibi bir tane ayarlamaktır:
		
		1. "open" class'ı, 34. satırdaki className'i "cover" olan div'e yalnızca aşağıdaki koşulların tümü karşılandığında uygulanmalıdır: 
		   	
			   - Kullanıcı mouse butonunu "cover" div'inin içinde bir yerde basılı tutuyorsa.
			   
    		   - Mouse butonunu basılı tutmaya devam ederken, imleci basılı tutmaya başladığı yerin 50 piksel soluna hareket ettirir. 
		
		2. Kullanıcı daha sonra mouse'unu "cover" div'i açıkken aşağı doğru hareket ettirirse, "open" 
		   class'ı kaldırılmalı ve böylece kart kapatılmalıdır. 
		   
	Not: cardOpen state'ini, 33. satırdaki onClick olay işleyicisini ve 34. satırdaki "open" class'ının şu anda uygulanma şeklini değiştirmeniz veya düzenlemeniz gerekecektir. 
*/

  const [cardOpen, setCardOpen] = useState(false)
  const initialX = useRef(0)
  const mouseDown = useRef(false)
  const handleMouseDown = (e) => {
    mouseDown.current = true
    initialX.current = e.clientX
  }

  const handleMouseMove = (e) => {
    if (mouseDown.current) {
      const diffX = e.clientX - initialX.current

      
      if (diffX < 0 && !cardOpen) {
        setCardOpen(true)
      }

     
      if (diffX > 0 && cardOpen) {
        setCardOpen(false)
      }
    }
  }

  const handleMouseUp = () => {
    mouseDown.current = false
  }
  return (
    <div className='wrapper'>
      <Header />
      <div className='card'>
        <InnerMessage />

        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`cover ${cardOpen && 'open'}`}
        >
          <FrontMessage />
          <img src='./images/forLoop.png' />
        </div>
      </div>
    </div>
  )
}
