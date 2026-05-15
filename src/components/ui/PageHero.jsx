import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MotionDiv } from './motion';

const isExternalUrl = (url) => typeof url === 'string' && /^https?:\/\//i.test(url);
const isAnchorUrl = (url) => typeof url === 'string' && url.includes('#');

const CtaLink = ({ to, className, children }) => {
  if (isExternalUrl(to) || isAnchorUrl(to)) {
    return (
      <a
        href={to}
        className={className}
        {...(isExternalUrl(to) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

const PageHero = ({ badge, title, subtitle, cta, ctaTo, secondaryCta, secondaryTo }) => (
  <section className="pt-8 pb-16 md:pb-20 border-b border-neutral-100">
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="container-page"
    >
      {badge && <span className="badge mb-6">{badge}</span>}
      <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.9] max-w-4xl mb-6">{title}</h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl leading-relaxed mb-8">{subtitle}</p>
      )}
      {(cta || secondaryCta) && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          {cta && ctaTo && (
            <CtaLink to={ctaTo} className="btn-primary">
              {cta} <ArrowRight size={16} aria-hidden />
            </CtaLink>
          )}
          {secondaryCta && secondaryTo && (
            <CtaLink to={secondaryTo} className="btn-secondary">
              {secondaryCta}
            </CtaLink>
          )}
        </MotionDiv>
      )}
    </MotionDiv>
  </section>
);

export default PageHero;
