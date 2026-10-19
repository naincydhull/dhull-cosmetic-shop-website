import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { FiAward, FiTag, FiUsers, FiPackage, FiCheckCircle } from 'react-icons/fi';
import { heroImages, categoryImages } from '../data/images';

const highlights = [
  {
    icon: FiAward,
    title: '100% Genuine Products',
    desc: 'Every product on our shelves is sourced directly from authorised distributors — no fakes, no compromises.',
    color: 'from-rose-400 to-rose-600',
  },
  {
    icon: FiTag,
    title: 'Affordable Prices',
    desc: 'Premium beauty at prices that respect your budget. Quality shouldn\'t cost a fortune.',
    color: 'from-gold-400 to-gold-600',
  },
  {
    icon: FiUsers,
    title: 'Trusted by Customers',
    desc: 'Over a decade of serving Harshola and Kaithal families with honesty and care.',
    color: 'from-rose-300 to-rose-500',
  },
  {
    icon: FiPackage,
    title: 'Wide Range of Products',
    desc: '500+ items across skincare, makeup, haircare, fragrance and nail care — all under one roof.',
    color: 'from-gold-500 to-gold-700',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-cream-100">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-xl bg-blush-50">
              <img
                src={heroImages.about}
                alt="Dhull Cosmetic Shop beauty products display"
                className="block w-full h-auto object-contain"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = categoryImages.Skincare; }}
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-rose-500 text-cream-50 rounded-2xl shadow-xl p-6 max-w-[200px]">
              <p className="font-heading text-3xl font-bold">10+</p>
              <p className="text-sm text-cream-50/80">Years of serving our community with trust</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              title="About Us"
              centered={false}
              titleClassName="!text-3xl sm:!text-4xl"
            />
            <div className="mt-6 space-y-5 text-charcoal-600 leading-relaxed">
              <p>
                Dhull Cosmetic Shop started as a small counter in Harshola village with a simple mission: bring genuine, quality beauty products to local families without them having to travel to the city. Over the years, that counter has grown into one of Kaithal's most trusted cosmetic destinations — but our values haven't changed.
              </p>
              <p>
                We carefully hand-pick every item on our shelves — from daily skincare essentials like cleansers, moisturisers and serums, to makeup for every occasion, haircare essentials, fragrances, and nail care. Whether you're looking for a gentle face wash, a long-lasting lipstick, or a nourishing hair oil, you'll find authentic products at honest prices.
              </p>
              <p>
                Our promise is simple: authentic products, fair prices, and friendly advice you can trust. We know our customers by name, we remember their preferences, and we're always here to help you find exactly what you need — because beauty shopping should feel personal, not overwhelming.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                  className="card-base p-6 flex flex-col items-center text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={26} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}