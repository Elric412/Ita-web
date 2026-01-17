class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false; 
  private isInitialized: boolean = false;

  constructor() {}

  init() {
    if (this.isInitialized) return;
    
    try {
      // Cross-browser AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5; // Master volume limit
      this.masterGain.connect(this.ctx.destination);
      
      this.isInitialized = true;
    } catch (e) {
      console.error("Audio initialization failed", e);
    }
  }

  toggleMute(shouldPlay: boolean) {
    if (!this.ctx || !this.masterGain) this.init();
    
    this.isMuted = !shouldPlay;

    if (this.ctx) {
      if (shouldPlay) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this.masterGain?.gain.setTargetAtTime(0.5, this.ctx.currentTime, 0.1);
      } else {
        this.masterGain?.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      }
    }
    
    return !this.isMuted;
  }

  // --- SOUND SYNTHESIS ENGINE ---
  
  // High pitched "Ping"
  private playPing() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 1.5);
    
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  // Low frequency "Warp" drop
  private playWarp() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2);
    
    // Low pass filter to dull the sawtooth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 2);
  }

  // Low Rumble Drone
  private playDrone() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(50, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 3);
  }

  // Public Methods
  playHover() {
    if (this.isMuted) return;
    if (!this.ctx) this.init();
    
    // Subtle high frequency click
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime); // Very quiet
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playClick() {
    if (this.isMuted) return;
    if (!this.ctx) this.init();

    // Sharp tick
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // THE GENJUTSU SOUND
  playActivation() {
    if (this.isMuted) return;
    if (!this.ctx) this.init();
    
    // Layer sounds for cinematic effect
    this.playPing(); // The "Bell"
    this.playWarp(); // The "Distortion"
    this.playDrone(); // The "Power"
  }
}

export const audioManager = new AudioManager();
