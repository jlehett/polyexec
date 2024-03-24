import { motion } from 'framer-motion';

const Spinning = ({ children, size }) => {
    return (
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ width: size, height: size }}
        >
            {children}
        </motion.div>
    );
}

export default Spinning;
