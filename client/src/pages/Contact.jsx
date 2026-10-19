import { motion } from 'framer-motion';
import { FiPhone, FiMapPin, FiClock, FiMail, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import GoogleMap from '../components/GoogleMap';
import { fadeUp, staggerContainer } from '../utils/animations';

const WHATSAPP_NUMBER = '918053224896';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to get in touch with Dhull Cosmetic Shop.")}`;

const contactCards = [
  {
    icon: FiPhone,
    title: 'Call Us',
    value: '8053224896',
    href: 'tel:+918053224896',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    value: '8053224896',
    href: WHATSAPP_LINK,
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: FiMapPin,
    title: 'Visit Us',
    value: 'Harshola, Kaithal, Haryana',
    color: 'bg-gold-100 text-gold-600',
  },
  {
    icon: FiClock,
    title: 'Opening Hours',
    value: '9:00 AM - 7:00 PM Daily',
    color: 'bg-rose-100 text-rose-300',
  },
];

export default function Contact() {
  return (
    <PageTransition>
      <section className="pt-12 pb-8 bg-gradient-to-br from-blush-100 via-cream-100 to-gold-50">
        <div className="container-custom text-center">
          <SectionTitle
            title="Get in Touch"
            subtitle="Questions about a product? Want to check availability? We're here to help."
          />
        </div>
      </section>

      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-charcoal-900">{card.title}</h3>
                  <p className="text-charcoal-500 mt-1 text-sm break-words">{card.value}</p>
                </>
              );

              return (
                <motion.div key={card.title} variants={fadeUp} whileHover={{ y: -6 }}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="card-base p-6 block group h-full"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="card-base p-6 group h-full">{content}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                  <FiSend size={22} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-charcoal-900">Send a Message</h2>
                  <p className="text-sm text-charcoal-500">We'll reply as soon as we can.</p>
                </div>
              </div>
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <GoogleMap className="h-80 lg:h-96" />
              <div className="card-base p-6">
                <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">Prefer to talk directly?</h3>
                <p className="text-sm text-charcoal-500 mb-4">
                  Call us or send a quick WhatsApp message — it's the fastest way to reach us.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+918053224896" className="btn-secondary flex-1 text-sm">
                    <FiPhone className="mr-2" aria-hidden="true" />
                    Call Now
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center flex-1 px-6 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm">
                    <FaWhatsapp className="mr-2" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
                <div className="mt-6 flex items-start gap-3 text-sm text-charcoal-500">
                  <FiMail className="text-rose-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>Or just walk in! We're open every day from 9 AM to 7 PM at Harshola, Kaithal.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}