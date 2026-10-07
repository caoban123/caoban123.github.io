// Web Audio API Synthesizer - Không phụ thuộc file âm thanh ngoài, siêu nhẹ và êm ái
class SoundManager {
  constructor() {
    this.ctx = null
    this.enabled = false
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled')
      this.enabled = saved === 'true'
    }
    this.subscribers = new Set()
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggle() {
    this.initContext()
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_enabled', String(this.enabled))
    }
    this.subscribers.forEach((cb) => cb(this.enabled))
    if (this.enabled) {
      this.playSuccess()
    }
    return this.enabled
  }

  subscribe(cb) {
    this.subscribers.add(cb)
    cb(this.enabled)
    return () => this.subscribers.delete(cb)
  }

  playHover() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.05)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.05)
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(600, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.08)
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.05)
        gain.gain.setValueAtTime(0.035, now + idx * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now + idx * 0.05)
        osc.stop(now + idx * 0.05 + 0.15)
      })
    } catch (e) {}
  }

  playBleep() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      const freq = 440 + Math.random() * 260
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)
      gain.gain.setValueAtTime(0.012, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.03)
    } catch (e) {}
  }
}

export const soundFx = new SoundManager()
