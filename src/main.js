import './style.scss'

import {
  ArrowRight,
  ArrowUpRight,
  CarFront,
  Clock,
  Compass,
  Crown,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Quote,
  ShieldCheck,
  Trophy,
  UserRound,
  createIcons,
} from 'lucide'

createIcons({
  icons: {
    ArrowRight,
    ArrowUpRight,
    CarFront,
    Clock,
    Compass,
    Crown,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Quote,
    ShieldCheck,
    Trophy,
    UserRound,
  },
})

const contactForm = document.querySelector('.contact-form')
const contactMessage = contactForm.querySelector('[name="message"]')
const contactCounter = contactForm.querySelector('.contact-form__counter')
const contactStatus = contactForm.querySelector('.contact-form__status')

contactMessage.addEventListener('input', () => {
  contactCounter.textContent = `${contactMessage.value.length}/500`
})

contactForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = new FormData(contactForm)
  const subject = encodeURIComponent('Звернення із сайту DRIVE')
  const body = encodeURIComponent(
    `Ім’я: ${data.get('name')}\nТелефон: ${data.get('phone')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`,
  )

  contactStatus.textContent = 'Завершіть надсилання повідомлення у своїй поштовій програмі.'
  window.location.href = `mailto:info@drive.ua?subject=${subject}&body=${body}`
})
