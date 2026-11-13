import * as fm from 'framer-motion';
import { pageTransition } from '../utils/animations';

export default function PageTransition({ children }) {
  return (
    <fm.motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </fm.motion.div>
  );
}