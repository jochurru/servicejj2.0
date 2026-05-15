import { FadeIn } from './FadeIn';

const SectionHeader = ({ badge, title, subtitle, align = 'center', dark = false }) => (
  <FadeIn className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-xl'}`}>
    {badge && <span className={`badge mb-4 ${dark ? 'bg-white/10 text-white/80' : ''}`}>{badge}</span>}
    <h2 className={`text-3xl md:text-5xl leading-[0.95] mb-4 ${dark ? 'text-white' : ''}`}>{title}</h2>
    {subtitle && (
      <p className={`text-base md:text-lg leading-relaxed ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>
        {subtitle}
      </p>
    )}
  </FadeIn>
);

export default SectionHeader;
