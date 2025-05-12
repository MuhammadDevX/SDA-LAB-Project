import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/goals', label: 'Goals' },
  { href: '/reports', label: 'Reports' },
];

export default function TopNavBar() {
  const router = useRouter();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setDark(d => {
      const newDark = !d;
      document.documentElement.setAttribute('data-theme', newDark ? 'dark' : '');
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
      return newDark;
    });
  };

  return (
    <nav style={{
      width: '100%',
      background: 'var(--color-card)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      padding: '0.5rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'background 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 900, fontSize: 26, color: 'var(--color-primary)', letterSpacing: 1 }}>💸</span>
        <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, color: 'var(--color-heading)' }}>FinManage</span>
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {navItems.map(item => (
          <Link href={item.href} key={item.href} legacyBehavior>
            <a style={{
              fontWeight: 500,
              fontSize: 16,
              color: router.pathname === item.href ? 'var(--color-primary)' : 'var(--color-text)',
              textDecoration: 'none',
              borderBottom: router.pathname === item.href ? '2px solid var(--color-primary)' : '2px solid transparent',
              padding: '8px 0',
              transition: 'color 0.2s, border-bottom 0.2s',
            }}>{item.label}</a>
          </Link>
        ))}
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', marginLeft: 18, cursor: 'pointer', color: 'var(--color-primary)', fontSize: 20, padding: 4 }} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
} 