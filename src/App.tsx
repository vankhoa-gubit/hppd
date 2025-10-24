import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [stage, setStage] = useState<'card' | 'cake' | 'wishes' | 'gift'>('card')
  const [cardOpen, setCardOpen] = useState(false)
  const [candlesLit, setCandlesLit] = useState(true)
  const [showWishes, setShowWishes] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const recordAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playBirthdaySong = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioContextRef.current = audioContext

    // Giai điệu Happy Birthday đầy đủ hơn
    const notes = [
      { freq: 264, duration: 0.5 }, { freq: 264, duration: 0.5 },
      { freq: 297, duration: 1 }, { freq: 264, duration: 1 },
      { freq: 352, duration: 1 }, { freq: 330, duration: 2 },
      { freq: 264, duration: 0.5 }, { freq: 264, duration: 0.5 },
      { freq: 297, duration: 1 }, { freq: 264, duration: 1 },
      { freq: 396, duration: 1 }, { freq: 352, duration: 2 },
    ]

    let currentTime = audioContext.currentTime
    notes.forEach(note => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.frequency.value = note.freq
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.3, currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration)
      oscillator.start(currentTime)
      oscillator.stop(currentTime + note.duration)
      currentTime += note.duration
    })
  }

  const openCard = () => {
    setCardOpen(true)
    setTimeout(() => {
      setStage('cake')
      playSong()
    }, 1500)
  }

  const playSong = () => {
    try {
      playBirthdaySong()
    } catch (e) {
      console.log('Audio play failed:', e)
    }

    setTimeout(() => {
      setCandlesLit(false)
      setTimeout(() => {
        setStage('wishes')
        setTimeout(() => {
          setShowWishes(true)
          // Sau 20s chuyển sang stage gift
          setTimeout(() => {
            setStage('gift')
          }, 20000)
        }, 500)
      }, 2000)
    }, 6000)
  }

  const openGift = () => {
    if (giftOpened) return
    setGiftOpened(true)

    // Phát file audio từ public/record sử dụng ref
    try {
      const audio = recordAudioRef.current
      if (audio) {
        // Reset về đầu nếu đã phát trước đó
        audio.currentTime = 0

        // Play với promise handling
        const playPromise = audio.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playing successfully')
            })
            .catch(error => {
              console.error('Audio play failed:', error)
              alert('Không thể phát audio. Vui lòng bật âm thanh và thử lại!')
            })
        }
      } else {
        console.error('Audio element not found')
      }
    } catch (error) {
      console.error('Audio playback error:', error)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center overflow-hidden relative transition-colors duration-[1500ms] ease-out ${stage === 'cake' && candlesLit ? 'bg-[#1a1a2e]' : 'bg-[#fef6e4]'
      }`}>
      {/* Stage 1: Thiệp sinh nhật */}
      {stage === 'card' && (
        <div className="relative w-full h-screen flex items-center justify-center perspective-[1500px]">
          {/* Dây tua rua và bóng bay xung quanh */}
          <div className="decorations-around">
            {/* Ruy băng trên và dưới */}
            <div className="ribbon-decoration ribbon-top">
              <div className="ribbon-wave"></div>
            </div>

            <div className="ribbon-decoration ribbon-bottom">
              <div className="ribbon-wave"></div>
            </div>

            {/* Cupcake xung quanh thiệp - ra ngoài */}
            <div className="decoration-cupcake cupcake-outside cupcake-1">
              <div className="cupcake-frosting">
                <div className="cupcake-cherry"></div>
              </div>
              <div className="cupcake-wrapper"></div>
            </div>

            <div className="decoration-cupcake cupcake-outside cupcake-2">
              <div className="cupcake-frosting frosting-pink">
                <div className="cupcake-cherry"></div>
              </div>
              <div className="cupcake-wrapper wrapper-pink"></div>
            </div>

            <div className="decoration-cupcake cupcake-outside cupcake-3">
              <div className="cupcake-frosting frosting-yellow">
                <div className="cupcake-cherry"></div>
              </div>
              <div className="cupcake-wrapper wrapper-yellow"></div>
            </div>

            <div className="decoration-cupcake cupcake-outside cupcake-4">
              <div className="cupcake-frosting frosting-blue">
                <div className="cupcake-cherry"></div>
              </div>
              <div className="cupcake-wrapper wrapper-blue"></div>
            </div>

            <div className="decoration-cupcake cupcake-outside cupcake-5">
              <div className="cupcake-frosting frosting-purple">
                <div className="cupcake-cherry"></div>
              </div>
              <div className="cupcake-wrapper wrapper-purple"></div>
            </div>

            <div className="decoration-cupcake cupcake-outside cupcake-6">
              <div className="cupcake-frosting frosting-orange">
                <div className="cupcake-cherry"></div>
              </div>
              <div className="cupcake-wrapper wrapper-orange"></div>
            </div>

            {/* Dây tua rua bên trái */}
            <div className="garland garland-left-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="garland-piece" style={{
                  animationDelay: `${i * 0.2}s`
                }}></div>
              ))}
            </div>

            {/* Dây tua rua bên trái (thứ 2) */}
            <div className="garland garland-left-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="garland-piece" style={{
                  animationDelay: `${i * 0.25}s`
                }}></div>
              ))}
            </div>

            {/* Dây tua rua bên phải */}
            <div className="garland garland-right-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="garland-piece" style={{
                  animationDelay: `${i * 0.15}s`
                }}></div>
              ))}
            </div>

            {/* Dây tua rua bên phải (thứ 2) */}
            <div className="garland garland-right-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="garland-piece" style={{
                  animationDelay: `${i * 0.3}s`
                }}></div>
              ))}
            </div>

            {/* Bóng bay bên trái - vị trí không đều */}
            <div className="balloons-left">
              <div className="balloon-wrapper" style={{ top: '15%', left: '8%', animationDelay: '0s' }}>
                <div className="balloon balloon-1">
                  <div className="balloon-string"></div>
                </div>
              </div>
              <div className="balloon-wrapper" style={{ top: '35%', left: '5%', animationDelay: '0.5s' }}>
                <div className="balloon balloon-3">
                  <div className="balloon-string"></div>
                </div>
              </div>
              <div className="balloon-wrapper" style={{ top: '55%', left: '10%', animationDelay: '1s' }}>
                <div className="balloon balloon-2">
                  <div className="balloon-string"></div>
                </div>
              </div>
              <div className="balloon-wrapper" style={{ top: '72%', left: '7%', animationDelay: '1.5s' }}>
                <div className="balloon balloon-4">
                  <div className="balloon-string"></div>
                </div>
              </div>
            </div>

            {/* Bóng bay bên phải - vị trí không đều */}
            <div className="balloons-right">
              <div className="balloon-wrapper" style={{ top: '20%', right: '6%', animationDelay: '0.3s' }}>
                <div className="balloon balloon-2">
                  <div className="balloon-string"></div>
                </div>
              </div>
              <div className="balloon-wrapper" style={{ top: '40%', right: '9%', animationDelay: '0.8s' }}>
                <div className="balloon balloon-4">
                  <div className="balloon-string"></div>
                </div>
              </div>
              <div className="balloon-wrapper" style={{ top: '58%', right: '5%', animationDelay: '1.2s' }}>
                <div className="balloon balloon-1">
                  <div className="balloon-string"></div>
                </div>
              </div>
              <div className="balloon-wrapper" style={{ top: '78%', right: '8%', animationDelay: '1.7s' }}>
                <div className="balloon balloon-3">
                  <div className="balloon-string"></div>
                </div>
              </div>
            </div>

            {/* Confetti rơi */}
            <div className="confetti-container">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="confetti" style={{
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                  width: `${8 + Math.random() * 6}px`,
                  height: `${8 + Math.random() * 6}px`,
                  backgroundColor: ['#ff9999', '#ffcc99', '#ffff99', '#99ff99', '#99ccff', '#cc99ff', '#ff6b9d', '#ffd700'][Math.floor(Math.random() * 8)]
                }}></div>
              ))}
            </div>
          </div>

          <div className={`birthday-card ${cardOpen ? 'open' : ''}`} onClick={openCard}>
            <div className="card-front bg-[#fff8f0] rounded-[20px] md:rounded-[30px] p-6 md:p-10 shadow-[0_20px_60px_rgba(139,69,19,0.15)] border-2 md:border-4 border-[#d4a574] relative cursor-pointer hover:shadow-[0_25px_70px_rgba(139,69,19,0.2)] transition-shadow duration-300">
              <div className="card-decorations">
                {/* Nến trang trí - 2 cây chéo */}
                <div className="decoration-candle top-left">
                  <div className="small-flame">
                    <div className="small-flame-inner"></div>
                  </div>
                  <div className="small-candle"></div>
                </div>

                <div className="decoration-candle bottom-right">
                  <div className="small-flame">
                    <div className="small-flame-inner"></div>
                  </div>
                  <div className="small-candle"></div>
                </div>

                {/* Cupcake trang trí - 2 cái chéo còn lại */}
                <div className="decoration-cupcake-corner corner-top-right">
                  <div className="cupcake-frosting frosting-pink">
                    <div className="cupcake-cherry"></div>
                  </div>
                  <div className="cupcake-wrapper wrapper-pink"></div>
                </div>

                <div className="decoration-cupcake-corner corner-bottom-left">
                  <div className="cupcake-frosting frosting-yellow">
                    <div className="cupcake-cherry"></div>
                  </div>
                  <div className="cupcake-wrapper wrapper-yellow"></div>
                </div>

                {/* Hoa trang trí */}
                <div className="decoration-flower flower-1">
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal-center"></div>
                </div>

                <div className="decoration-flower flower-2">
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal-center"></div>
                </div>

                <div className="decoration-flower flower-3">
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal-center"></div>
                </div>

                <div className="decoration-flower flower-4">
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal-center"></div>
                </div>

                <div className="decoration-flower flower-5">
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal-center"></div>
                </div>

                <div className="decoration-flower flower-6">
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal"></div>
                  <div className="petal-center"></div>
                </div>
              </div>

              <div className="gift-box">
                <div className="gift-body"></div>
                <div className="gift-ribbon-v"></div>
                <div className="gift-ribbon-h"></div>
                <div className="gift-lid"></div>
                <div className="gift-bow"></div>
              </div>

              <h1 className="text-3xl md:text-[42px] font-bold text-[#8b4513] text-center mb-3 font-serif">Chúc Mừng Sinh Nhật</h1>
              <p className="text-2xl md:text-[32px] font-semibold text-[#d4826b] text-center mb-6">MẸ YÊU</p>
              <p className="card-hint text-base md:text-lg text-[#a0522d] text-center opacity-70">Nhấp để mở thiệp</p>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Bánh sinh nhật */}
      {stage === 'cake' && (
        <div className="cake-stage relative flex flex-col items-center justify-center w-full min-h-screen py-10 px-5">
          {/* Trang trí xung quanh bánh */}
          <div className="cake-decorations-around">
            {/* Pháo hoa rơi */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`firework-${i}`}
                className="firework-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  background: ['#ff6b9d', '#ffd700', '#87ceeb', '#ff9999', '#cc99ff', '#ffcc99'][Math.floor(Math.random() * 6)]
                }}
              />
            ))}

            {/* Bóng bay bay lên */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`balloon-${i}`}
                className="floating-balloon"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              >
                <div className={`balloon-floating balloon-${(i % 4) + 1}`}>
                  <div className="balloon-string-floating"></div>
                </div>
              </div>
            ))}

            {/* Hoa bay xung quanh */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`flower-${i}`}
                className="floating-flower"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }}
              >
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal-center"></div>
              </div>
            ))}
          </div>

          <div className="stars-container">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="star" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}></div>
            ))}
          </div>

          <div className="flex flex-col items-center relative z-10 bg-white/5 py-8 px-8 md:py-[60px] md:px-20 rounded-[20px] md:rounded-[30px] backdrop-blur-[10px] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_80px_rgba(255,215,0,0.2)] my-auto">
            <div className="candles-row">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="candle-wrapper">
                  {candlesLit && (
                    <div className="flame">
                      <div className="flame-inner"></div>
                    </div>
                  )}
                  <div className="candle">
                    <div className="candle-top"></div>
                    <div className="candle-body"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cake">
              <div className="cake-layer layer-1">
                <div className="frosting"></div>
                <div className="decoration-dots">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="dot"></div>
                  ))}
                </div>
              </div>
              <div className="cake-layer layer-2">
                <div className="frosting"></div>
                <div className="decoration-flowers">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flower"></div>
                  ))}
                </div>
              </div>
              <div className="cake-layer layer-3">
                <div className="frosting"></div>
              </div>
            </div>
          </div>

          <h2 className="song-text">Happy Birthday to You!</h2>
        </div>
      )}

      {/* Stage 3: Lời chúc */}
      {stage === 'wishes' && (
        <div className="w-full max-w-[1200px] p-5 md:p-10">
          <div className={`wishes-container ${showWishes ? 'show' : ''}`}>
            <div className="floating-hearts">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="heart" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }}></div>
              ))}
            </div>

            <h1 className="text-3xl md:text-[56px] font-bold text-[#d63384] text-center mb-8 md:mb-[60px] font-serif animate-[slideDown_0.8s_ease-out]">Chúc Mừng Sinh Nhật Mẹ!</h1>

            <div className="wishes-list flex flex-col gap-5 md:gap-[25px] mb-10 md:mb-[60px]">
              <div className="wish-card bg-white rounded-[20px] py-5 px-5 md:py-[30px] md:px-10 flex flex-col md:flex-row items-center gap-4 md:gap-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-[#ffc9d9] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,157,0.3)] transition-all duration-300 text-center md:text-left" style={{ animationDelay: '0.3s' }}>
                <div className="wish-icon icon-heart"></div>
                <p className="text-base md:text-2xl text-[#555] leading-relaxed flex-1">Chúc mẹ luôn khỏe mạnh, tràn đầy năng lượng và hạnh phúc</p>
              </div>

              <div className="wish-card bg-white rounded-[20px] py-5 px-5 md:py-[30px] md:px-10 flex flex-col md:flex-row items-center gap-4 md:gap-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-[#ffc9d9] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,157,0.3)] transition-all duration-300 text-center md:text-left" style={{ animationDelay: '0.6s' }}>
                <div className="wish-icon icon-star"></div>
                <p className="text-base md:text-2xl text-[#555] leading-relaxed flex-1">Mẹ là người phụ nữ tuyệt vời nhất, con yêu mẹ vô cùng</p>
              </div>

              <div className="wish-card bg-white rounded-[20px] py-5 px-5 md:py-[30px] md:px-10 flex flex-col md:flex-row items-center gap-4 md:gap-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-[#ffc9d9] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,157,0.3)] transition-all duration-300 text-center md:text-left" style={{ animationDelay: '0.9s' }}>
                <div className="wish-icon icon-flower"></div>
                <p className="text-base md:text-2xl text-[#555] leading-relaxed flex-1">Cảm ơn mẹ đã luôn bên cạnh, chăm sóc và yêu thương con</p>
              </div>

              <div className="wish-card bg-white rounded-[20px] py-5 px-5 md:py-[30px] md:px-10 flex flex-col md:flex-row items-center gap-4 md:gap-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-[#ffc9d9] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,157,0.3)] transition-all duration-300 text-center md:text-left" style={{ animationDelay: '1.2s' }}>
                <div className="wish-icon icon-sparkle"></div>
                <p className="text-base md:text-2xl text-[#555] leading-relaxed flex-1">Chúc mẹ tuổi mới an khang, thịnh vượng, vạn sự như ý</p>
              </div>

              <div className="wish-card bg-white rounded-[20px] py-5 px-5 md:py-[30px] md:px-10 flex flex-col md:flex-row items-center gap-4 md:gap-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-[#ffc9d9] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,157,0.3)] transition-all duration-300 text-center md:text-left" style={{ animationDelay: '1.5s' }}>
                <div className="wish-icon icon-gift"></div>
                <p className="text-base md:text-2xl text-[#555] leading-relaxed flex-1">Yêu mẹ nhiều !</p>
              </div>
            </div>

            <div className="text-center flex flex-col items-center gap-[15px] animate-[fadeIn_1s_ease-out_2s_both]">
              <div className="signature-heart"></div>
              <p className="text-2xl md:text-[32px] font-semibold text-[#d63384] font-serif">Zai cưng của mẹ hehe</p>
            </div>
          </div>
        </div>
      )}

      {/* Stage 4: Hộp quà lớn */}
      {stage === 'gift' && (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden animate-[fadeIn_1s_ease-out]">
          {/* Trang trí xung quanh */}
          <div className="gift-decorations">
            {/* Confetti rơi */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`confetti-${i}`}
                className="confetti-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  background: ['#ff6b9d', '#ffd700', '#ff69b4', '#87ceeb', '#98fb98'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}

            {/* Ngôi sao lấp lánh */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}

            {/* Bóng bay bay lên */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`balloon-rise-${i}`}
                className="balloon-rise"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              >
                <div className={`balloon-gift balloon-color-${(i % 4) + 1}`}>
                  <div className="balloon-highlight"></div>
                  <div className="balloon-string-gift"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Hộp quà chính */}
          <div className="relative flex flex-col items-center">
            <div className={`big-gift-box ${giftOpened ? 'opened' : ''}`} onClick={openGift}>
              <div className="gift-glow"></div>

              <div className="big-gift-lid">
                <div className="lid-top">
                  <div className="ribbon-vertical-big"></div>
                  <div className="ribbon-horizontal-big"></div>
                  <div className="ribbon-bow">
                    <div className="bow-left"></div>
                    <div className="bow-right"></div>
                    <div className="bow-center"></div>
                  </div>
                </div>
              </div>

              <div className="gift-body-big">
                <div className="gift-pattern">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="pattern-dot"></div>
                  ))}
                </div>
                <div className="body-ribbon-vertical"></div>
                <div className="body-ribbon-horizontal"></div>
              </div>
            </div>

            {!giftOpened && (
              <div className="mt-8 text-center w-full animate-[hint-bounce_1.5s_ease-in-out_infinite]">
                {/* <span className="text-2xl md:text-[28px] font-bold text-white font-serif shadow-[0_0_20px_rgba(255,215,0,0.8),0_0_40px_rgba(255,215,0,0.5),3px_3px_10px_rgba(0,0,0,0.5)] inline-block">
                  Nhấn vào để mở quà! 🎁
                </span> */}
              </div>
            )}
          </div>

          {giftOpened && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 animate-[message-appear_1s_ease-out]">
              <div className="message-hearts">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="message-heart"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Audio element ẩn để preload */}
      <audio
        ref={recordAudioRef}
        src={`${import.meta.env.BASE_URL}record/hppd.mp3`}
        preload="auto"
        className="hidden"
      />
    </div>
  )
}

export default App
