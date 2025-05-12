import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaChartPie, FaExchangeAlt, FaBullseye, FaFileAlt } from 'react-icons/fa';
import AIExpenseGuide from './AIExpenseGuide';

const navItems = [
  { href: '/', label: 'Dashboard', icon: <FaChartPie /> },
  { href: '/transactions', label: 'Transactions', icon: <FaExchangeAlt /> },
  { href: '/goals', label: 'Goals', icon: <FaBullseye /> },
  { href: '/reports', label: 'Reports', icon: <FaFileAlt /> },
];

export default function Sidebar({ refreshKey }) {
  const router = useRouter();
  return (
    <aside style={{ width: 250, background: '#1e293b', color: '#fff', padding: '2.5rem 1.2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <div style={{ fontWeight: 900, fontSize: 26, letterSpacing: 1, color: '#38bdf8', marginRight: 10 }}>💸</div>
          <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>FinManage</span>
        </div>
        <nav>
          {navItems.map(item => (
            <Link href={item.href} key={item.href} legacyBehavior>
              <a style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px',
                borderRadius: 8, marginBottom: 8, fontWeight: 500, fontSize: 16,
                background: router.pathname === item.href ? '#334155' : 'none',
                color: router.pathname === item.href ? '#38bdf8' : '#fff',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                boxShadow: router.pathname === item.href ? '0 2px 8px rgba(56,189,248,0.08)' : 'none',
              }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
        <AIExpenseGuide refreshKey={refreshKey} />
      </div>
      <div style={{ fontSize: 13, color: '#64748b', marginTop: 40, textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} FinManage
      </div>
    </aside>
  );
} 