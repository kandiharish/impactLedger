import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/** Validation message that slides in beneath a form field. */
export default function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          className="field-error"
        >
          <AlertCircle size={12} /> {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
