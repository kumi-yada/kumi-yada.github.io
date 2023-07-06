import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import './fade-in-section.css';

export function FadeInSection(props: PropsWithChildren) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting);
      });
    });
    observer.observe(domRef.current!);
    return () => observer.unobserve(domRef.current!);
  }, []);

  return (
    <div
      className={`flex-1 flex fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
