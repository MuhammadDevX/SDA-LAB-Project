import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
  return (
    <nav>
      <Link href="/" legacyBehavior><a className={router.pathname === '/' ? 'active' : ''}>Dashboard</a></Link>
      <Link href="/transactions" legacyBehavior><a className={router.pathname === '/transactions' ? 'active' : ''}>Transactions</a></Link>
      <Link href="/goals" legacyBehavior><a className={router.pathname === '/goals' ? 'active' : ''}>Goals</a></Link>
      <Link href="/reports" legacyBehavior><a className={router.pathname === '/reports' ? 'active' : ''}>Reports</a></Link>
    </nav>
  );
};

export default NavBar; 