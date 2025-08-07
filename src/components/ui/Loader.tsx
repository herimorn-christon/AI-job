import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader = ({ size = 'medium', color = 'blue' }: LoaderProps) => {
  const sizeMap = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  const colorMap = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizeMap[size]} border-4 ${colorMap[color as keyof typeof colorMap]} border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default Loader;