import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function DailyLunchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'lt';

  const hero = {
    lt: {
      title: 'Dienos pietų meniu',
      subtitle: 'Pirmadienis – Penktadienis, 11:00 – 16:00',
    },
    en: {
      title: 'Daily Lunch Menu',
      subtitle: 'Monday – Friday, 11:00 – 16:00',
    },
  }[lang];

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-bg">
          <img
            src="/images/hero/meniu/daily_lunch.jpg"
            alt="Daily lunch"
          />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section bg-white">
        <div className="container">{children}</div>
      </section>

      {/* STYLES */}
      <style jsx global>{`
        .menu-category {
          margin-bottom: 2rem;
        }

        .menu-item {
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .menu-item-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: #1f2937;
        }

        .menu-item-price {
          color: #047857;
          font-weight: 700;
        }

        .menu-item-description {
          color: #6b7280;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
        }

        .error-message {
          text-align: center;
          padding: 2rem;
          color: #dc2626;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
