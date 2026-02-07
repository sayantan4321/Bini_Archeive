import { useState, useEffect } from 'react'
import paperStyles from "./TornPaper.module.css"

// const [peeledItems, setPeeledItems] = useState(new Set());

// const handlePeel = (num) => {
//   setPeeledItems(prev => {
//     const next = new Set(prev)
//     next.add(num)
//     return next
//   })
// }


function App() {
  const [dummyVisible, setDummyVisible] = useState(true)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [clickedItems, setClickedItems] = useState(new Set())
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    console.log('overlayVisible:', overlayVisible, 'dummyVisible:', dummyVisible)
    if (!overlayVisible && !dummyVisible) {
      console.log('Showing message now')
      setShowMessage(true)
      const timer = setTimeout(() => {
        console.log('Hiding message')
        setShowMessage(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [overlayVisible])

  const handleDummyClick = () => {
    setDummyVisible(false)
    setShowMessage(true)
    const timer = setTimeout(() => setShowMessage(false), 4000)
  }

  const handleOverlayClick = () => {
    console.log('Overlay clicked, removing overlay')
    setOverlayVisible(false)
  }

  const handleItemClick = (num) => {
    const newClicked = new Set(clickedItems)
    if (!newClicked.has(num)) {
      newClicked.add(num)
      setClickedItems(newClicked)
    }
    // Once clicked, it stays clicked - no toggling back
  }

  const gridItems = [
    { num: 1, row: 1, col: 1, image: '/images/img1.jpg' },
    { num: 2, row: 1, col: 2, image: '/images/img2.png' },
    { num: 3, row: 1, col: 3, image: '/images/img3.jpg' },
    { num: 4, row: 1, col: 4, image: '/images/img4.png' },
    { num: 5, row: 2, col: 1, image: '/images/img5.jpg' },
    { num: 6, row: 2, col: '2/4', isCenter: true, image: '/images/img6.jpg' },
    { num: 7, row: 2, col: 4, image: '/images/img7.jpg' },
    { num: 8, row: 3, col: 1, image: '/images/img8.jpg' },
    { num: 9, row: 3, col: 2, image: '/images/img9.jpg' },
    { num: 10, row: 3, col: 3, image: '/images/img10.jpg' },
    { num: 11, row: 3, col: 4, image: '/images/img11.png' },
  ]

  // show the initial dummy screen first
  if (dummyVisible) {
    return (
      <div style={styles.dummyScreen}>
        <div style={styles.dummyScreenBg}></div>
        <div style={styles.dummyContent} onClick={handleDummyClick}>
          <p style={styles.dummyText}>Alteast Smile its your gift 👀</p>
          <p style={styles.clickHint}>Click to continue</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {showMessage && (
        <div style={styles.messageOverlay}>
          <div style={styles.messageBox}>
            <p style={styles.messageText}>Unfold each of your photo</p>
            <p style={styles.messageText}>click at the middle photo in last pls🤗</p>
          </div>
        </div>
      )}

      <div style={{ ...styles.grid, ...(showMessage ? styles.gridBlurred : {}), pointerEvents: overlayVisible || showMessage ? 'none' : 'auto' }}>
        {gridItems.map((item) => (
          <div
            key={item.num}
            style={{
              ...styles.item,
              gridColumn: item.col,
              gridRow: item.row,
              ...(overlayVisible ? styles.itemHidden : styles.itemVisible),
              ...(clickedItems.has(item.num) ? styles.itemClicked : {}),
              ...(item.isCenter ? (clickedItems.has(item.num) ? styles.centerClicked : styles.center) : {}),
            }}
            onClick={() => {
              if (!showMessage) handleItemClick(item.num)
            }}
          >
            <div style={styles.flipCard}>
              <div style={{ ...styles.flipCardInner, ...(clickedItems.has(item.num) ? styles.flipped : {}) }}>
                <div style={{ ...styles.flipCardFace, ...styles.flipCardFront }}>
                  <div className={paperStyles.paper}>
                    <div className={paperStyles.content}>
                      {clickedItems.has(item.num) && item.image ? <img src={item.image} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={`Item ${item.num}`} /> : ""}
                    </div>
                  </div>
                </div>
                <div style={{ ...styles.flipCardFace, ...styles.flipCardBack }}>
                  <div className={paperStyles.paper}>
                    <div className={paperStyles.content}>
                      {clickedItems.has(item.num) && item.image ? <img src={item.image} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={`Item ${item.num}`} /> : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  dummyScreen: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  dummyScreenBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/images/img12.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(5px)',
    zIndex: 1,
  },
  dummyContent: {
    cursor: 'pointer',
    textAlign: 'center',
    padding: 'clamp(20px, 5vw, 60px)',
    backgroundColor: 'rgba(153, 153, 153, 0.95)',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2,
    maxWidth: '90vw',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  dummyText: {
    fontSize: 'clamp(24px, 6vw, 48px)',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 0 20px 0',
  },
  clickHint: {
    fontSize: 'clamp(14px, 4vw, 20px)',
    color: '#eee',
    margin: 0,
  },
  container: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#eaf0f1',
    position: 'relative',
  },
  blackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 50,
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
  messageOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  gridBlurred: {
    filter: 'blur(8px)',
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: '60px 80px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  messageText: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    textAlign: 'center',
    letterSpacing: '1px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '8px',
    width: '100%',
    height: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
//   item: {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: 'clamp(16px, 4vw, 32px)',
//   fontWeight: 'bold',
//   minWidth: 0,
//   minHeight: 0,
//   transition: 'all 0.3s ease',
//   cursor: 'pointer',
//   perspective: '1000px',
// },
item: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 0,
  minHeight: 0,
  cursor: 'pointer',
},

  flipCard: {
    width: '100%',
    height: '100%',
    perspective: '1000px',
  },
  flipCardInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transition: 'transform 0.7s',
    transformStyle: 'preserve-3d',
  },
  flipped: {
    transform: 'rotateY(180deg)',
  },
  flipCardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardFront: {
    zIndex: 2,
    transform: 'rotateY(0deg)',
  },
  flipCardBack: {
    transform: 'rotateY(180deg)',
  },
  itemHidden: {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'transparent',
    display: 'none',
  },
  itemVisible: {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'transparent',
  },
  itemClicked: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#000',
  },
  center: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  centerClicked: {
    backgroundColor: '#e0e0e0',
    border: 'none',
    color: '#000',
  },
}

export default App

