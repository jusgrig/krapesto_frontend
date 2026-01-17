import React from 'react';

export default function DailyLunchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-bg">
          <img src="/images/hero/meniu/daily-lunch.jpg" alt="Delicious lunch plate" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Dienos pietų meniu</h1>
          <p>Pirmadienis-Penktadienis, 11:00 - 16:00</p>
        </div>
      </section>

      {/* Menu Content Section */}
      <section className="section bg-white">
        <div className="container">
          {children}
        </div>
      </section>

      <style jsx global>{`
        .menu-category {
          margin-bottom: 2rem;
        }
        .menu-category h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #047857;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #047857;
        }
        .menu-item {
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .menu-item:last-child {
          border-bottom: none;
        }
        .menu-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        .menu-item-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: #1f2937;
          flex: 1;
        }
        .menu-item-price {
          color: #047857;
          font-weight: 700;
          font-size: 1rem;
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex-shrink: 0;
          margin-left: 1rem;
        }
        .menu-item-price span {
          display: block;
        }
        .menu-item-price div {
          display: block;
        }
        .menu-item-description {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-top: 0.5rem;
        }
        .complex-item {
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .complex-item:last-child {
          border-bottom: none;
        }
        .complex-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .complex-item-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: #1f2937;
          flex: 1;
        }
        .complex-item-price {
          color: #047857;
          font-weight: 700;
          font-size: 1rem;
          margin-left: 1rem;
        }
        .menu-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          overflow-x: hidden;
          width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 768px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .menu-day-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s;
          overflow: hidden;
          word-wrap: break-word;
          max-width: 100%;
        }
        .menu-day-card:hover {
          border-color: #047857;
          box-shadow: 0 4px 12px rgba(4, 120, 87, 0.1);
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
          font-size: 1.1rem;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
