'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface DailyMenu {
  date: string;
  published: boolean;
  categories?: Array<{
    name_lt: string;
    name_en: string;
    dishes: Array<{
      name_lt: string;
      name_en: string;
      ingredients_lt?: string;
      ingredients_en?: string;
      price: number;
      half_price?: number;
    }>;
  }>;
  complexes?: Array<{
    name_lt: string;
    name_en: string;
    price: number;
    dish_options: Array<{
      soup?: { name_lt: string; name_en: string };
      main_dish?: { name_lt: string; name_en: string };
      soup_size?: string;
    }>;
  }>;
}

type WeekResponse = DailyMenu[] | { menus: DailyMenu[] } | DailyMenu;

export default function DailyLunchPage() {
  const [menus, setMenus] = useState<DailyMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'lt' | 'en'>('lt');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLanguage(params.get('lang') === 'en' ? 'en' : 'lt');
  }, []);

  const normalize = (data: WeekResponse): DailyMenu[] => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object' && 'menus' in data && Array.isArray((data as any).menus)) return (data as any).menus;
    if (data && (data as DailyMenu).date) return [data as DailyMenu];
    return [];
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedDate = params.get('date');

    // FIXED: API_PATH now strictly follows Django urls.py: lunch-menu/date/<str:date_str>/
    const API_PATH = selectedDate 
      ? `/api/lunch-menu/date/${selectedDate}/?lang=${language}`
      : `/api/lunch-menu/week/?lang=${language}`;

    const fetchMenu = async () => {
      try {
        const res = await fetch(API_PATH, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const raw: WeekResponse = await res.json();
        const list = normalize(raw);
        setMenus(list);
        setError(null);
      } catch (err) {
        console.error("API Error:", err);
        setError(language === 'lt' ? 'Meniu nėra prieinamas' : 'Menu not available');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [language]);

  const formatPrice = (price: number) => `€${price.toFixed(2)}`;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
      language === 'lt' ? 'lt-LT' : 'en-US',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  if (loading) return <div className="loading">Kraunamas meniu...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const visibleMenus = menus.filter(m => m.published);

  if (!visibleMenus.length) {
    return (
      <div className="error-message">
        {language === 'lt' ? 'Meniu nėra prieinamas' : 'Menu not available'}
      </div>
    );
  }

  return (
    <>
      {visibleMenus.map(menu => (
        <div key={menu.date} style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#047857',
            paddingBottom: '0.5rem',
            borderBottom: '3px solid #047857'
          }}>
            <Link
              href={`/menu/daily-lunch/date/?date=${encodeURIComponent(menu.date)}${language ? `&lang=${language}` : ''}`}
              style={{ color: '#047857', textDecoration: 'none' }}
            >
              {formatDate(menu.date)}
            </Link>
          </h2>

          {menu.categories?.map((cat, i) => (
            <div key={i} className="menu-category">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#047857', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #047857' }}>
                {language === 'lt' ? cat.name_lt : cat.name_en}
              </h3>
              {cat.dishes.map((dish, j) => (
                <div key={j} className="menu-item" style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
                  <div className="menu-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="menu-item-name" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1f2937' }}>
                      {language === 'lt' ? dish.name_lt : dish.name_en}
                    </div>
                    <div className="menu-item-price" style={{ color: '#047857', fontWeight: 700 }}>
                      {dish.half_price ? (
                        <>
                          <div>½ {formatPrice(dish.half_price)}</div>
                          <div>{formatPrice(dish.price)}</div>
                        </>
                      ) : (
                        <span>{formatPrice(dish.price)}</span>
                      )}
                    </div>
                  </div>
                  {(language === 'lt' ? dish.ingredients_lt : dish.ingredients_en) && (
                    <div className="menu-item-description" style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                      {language === 'lt' ? dish.ingredients_lt : dish.ingredients_en}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {menu.complexes && menu.complexes.length > 0 && (
            <div className="menu-category">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#047857', marginBottom: '1rem' }}>
                {language === 'lt' ? 'Kompleksai' : 'Complexes'}
              </h3>
              {menu.complexes.map((c, i) => (
                <div key={i} className="complex-item" style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
                  <div className="complex-item-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="complex-item-name" style={{ fontWeight: 600 }}>
                      {language === 'lt' ? c.name_lt : c.name_en}
                    </div>
                    <div className="complex-item-price" style={{ color: '#047857', fontWeight: 700 }}>
                      {formatPrice(c.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}