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
  const language = typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en' : 'lt';

  useEffect(() => {
    const API_URL = 'http://57.128.249.100:8000/api/menu/daily-lunch/';
    const POLL_INTERVAL = 15000;

    let pollTimer: NodeJS.Timeout | null = null;

    const fetchMenu = async () => {
      try {
        console.log('List page - API URL (no date filter):', API_URL);
        console.log('Fetching menu from:', API_URL);

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: MenuResponse = await response.json();

        if (!data.menus || !Array.isArray(data.menus)) {
          throw new Error('Invalid response format: missing menus array');
        }

        setMenus(data.menus);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        setError(language === 'lt' ? 'Meniu nėra prieinamas' : 'Menu not available');
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchMenu();

    // Then poll every 15 seconds
    pollTimer = setInterval(fetchMenu, POLL_INTERVAL);

    return () => {
      if (pollTimer) {
        clearInterval(pollTimer);
      }
    };
  }, [language]);

  const formatPrice = (price: number) => {
    return '€' + parseFloat(price.toString()).toFixed(2);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(language === 'lt' ? 'lt-LT' : 'en-US', options);
  };

  const escapeHtml = (text: string) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const renderSingleMenu = (menuData: DailyMenu) => {
    if (!menuData || !menuData.published) {
      return null;
    }

    const hasDishes = menuData.categories?.some(
      (cat) => cat.dishes && cat.dishes.length > 0
    );

    if (!hasDishes && (!menuData.complexes || menuData.complexes.length === 0)) {
      return null;
    }

    return (
      <div key={menuData.date} style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#047857',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '3px solid #047857',
          }}
        >
          {formatDate(menuData.date)}
        </h2>

        {menuData.categories?.map((category, catIdx) => {
          if (!category.dishes || category.dishes.length === 0) return null;

          const categoryName = language === 'lt' ? category.name_lt : category.name_en;

          return (
            <div key={catIdx} className="menu-category">
              <h3>{categoryName}</h3>
              {category.dishes.map((dish, dishIdx) => {
                const dishName = language === 'lt' ? dish.name_lt : dish.name_en;
                const dishIngredients =
                  language === 'lt' ? dish.ingredients_lt : dish.ingredients_en;

                return (
                  <div key={dishIdx} className="menu-item">
                    <div className="menu-item-header">
                      <div className="menu-item-name">{dishName}</div>
                      <div className="menu-item-price">
                        {dish.half_price ? (
                          <>
                            <div>
                              ½ {language === 'lt' ? 'porcijos' : 'size'}:{' '}
                              {formatPrice(dish.half_price)}
                            </div>
                            <div>
                              {language === 'lt' ? 'Pilna porcija' : 'Full size'}:{' '}
                              {formatPrice(dish.price)}
                            </div>
                          </>
                        ) : (
                          <span>{formatPrice(dish.price)}</span>
                        )}
                      </div>
                    </div>
                    {dishIngredients && (
                      <div className="menu-item-description">{dishIngredients}</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {menuData.complexes && menuData.complexes.length > 0 && (
          <div className="menu-category">
            <h3>{language === 'lt' ? 'Kompleksai' : 'Complexes'}</h3>
            {menuData.complexes.map((complex, complexIdx) => {
              if (!complex.dish_options || complex.dish_options.length === 0) return null;

              return complex.dish_options.map((option, optionIdx) => {
                let displayName = '';

                if (option.soup && option.main_dish) {
                  const soupName =
                    language === 'lt' ? option.soup.name_lt : option.soup.name_en;
                  const mainDishName =
                    language === 'lt' ? option.main_dish.name_lt : option.main_dish.name_en;
                  const soupSize =
                    option.soup_size === 'half'
                      ? ' ½ ' + (language === 'lt' ? 'porcijos' : 'size')
                      : '';
                  const connector = language === 'lt' ? ' ir ' : ' and ';
                  displayName = soupName + soupSize + connector + mainDishName;
                } else if (option.main_dish) {
                  displayName =
                    language === 'lt' ? option.main_dish.name_lt : option.main_dish.name_en;
                } else if (option.soup) {
                  displayName = language === 'lt' ? option.soup.name_lt : option.soup.name_en;
                } else {
                  displayName = language === 'lt' ? complex.name_lt : complex.name_en;
                }

                return (
                  <div key={`${complexIdx}-${optionIdx}`} className="complex-item">
                    <div className="complex-item-header">
                      <div className="complex-item-name">{displayName}</div>
                      <div className="complex-item-price">{formatPrice(complex.price)}</div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Kraunamas meniu...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (menus.length === 0) {
    return (
      <div className="error-message">
        {language === 'lt' ? 'Meniu nėra prieinamas' : 'Menu not available'}
      </div>
    );
  }

  return <>{menus.map((menu) => renderSingleMenu(menu))}</>;
}
