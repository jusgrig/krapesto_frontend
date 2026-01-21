'use client';

import React, { useEffect, useState } from 'react';

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

interface MenuResponse {
  menus: DailyMenu[];
}

export default function DailyLunchPage() {
  const [menus, setMenus] = useState<DailyMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Kalba iš URL
  const getLanguage = () => {
    if (typeof window === 'undefined') return 'lt';
    return new URLSearchParams(window.location.search).get('lang') || 'lt';
  };

  const [language, setLanguage] = useState<'lt' | 'en'>('lt');

  // 🔹 Atnaujinam kalbą kai pasikeičia URL
  useEffect(() => {
    const lang = getLanguage();
    setLanguage(lang === 'en' ? 'en' : 'lt');
  }, []);

  // 🔹 Kraunam meniu pagal kalbą
  useEffect(() => {
    const API_URL = `http://57.128.249.100:8000/api/menu/daily-lunch/?lang=${language}`;

    const fetchMenu = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch menu');

        const data: MenuResponse = await response.json();
        setMenus(data.menus);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(language === 'lt' ? 'Meniu nėra prieinamas' : 'Menu not available');
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
  if (!menus.length)
    return <div className="error-message">
      {language === 'lt' ? 'Meniu nėra' : 'Menu not available'}
    </div>;

  return (
    <>
      {menus.map(menu => (
        <div key={menu.date} style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#047857',
            marginBottom: '1.5rem',
            borderBottom: '3px solid #047857'
          }}>
            {formatDate(menu.date)}
          </h2>

          {menu.categories?.map((cat, i) => (
            <div key={i} className="menu-category">
              <h3>{language === 'lt' ? cat.name_lt : cat.name_en}</h3>

              {cat.dishes.map((dish, j) => (
                <div key={j} className="menu-item">
                  <div className="menu-item-header">
                    <div className="menu-item-name">
                      {language === 'lt' ? dish.name_lt : dish.name_en}
                    </div>
                    <div className="menu-item-price">
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
                    <div className="menu-item-description">
                      {language === 'lt' ? dish.ingredients_lt : dish.ingredients_en}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {menu.complexes?.length > 0 && (
            <div className="menu-category">
              <h3>{language === 'lt' ? 'Kompleksai' : 'Complexes'}</h3>
              {menu.complexes.map((c, i) => (
                <div key={i} className="complex-item">
                  <div className="complex-item-header">
                    <div className="complex-item-name">
                      {language === 'lt' ? c.name_lt : c.name_en}
                    </div>
                    <div className="complex-item-price">
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
