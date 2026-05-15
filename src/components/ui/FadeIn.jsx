import { MotionDiv } from './motion';

export const FadeIn = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}) => {
  const offset = { up: { y: 24 }, down: { y: -24 }, left: { x: 24 }, right: { x: -24 } }[direction];

  return (
    <MotionDiv
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

export const Stagger = ({ children, className = '' }) => (
  <MotionDiv
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.1 } },
    }}
    className={className}
  >
    {children}
  </MotionDiv>
);

export const StaggerItem = ({ children, className = '' }) => (
  <MotionDiv
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    }}
    className={className}
  >
    {children}
  </MotionDiv>
);
