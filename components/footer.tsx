import Link from "next/link";

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-lead">
      <p className="eyebrow">Samkill Amsterdam</p>
      <h2>Draag de stad. Werk met karakter.</h2>
      <p>Herenmode voor elke dag en werkkleding op telefonische aanvraag.</p>
    </div>
    <div className="footer-links">
      <div><h3>Shop</h3><Link href="/collections/jassen">Jassen</Link><Link href="/collections/bodywarmers">Bodywarmers</Link><Link href="/collections/setjes">Setjes</Link><Link href="/collections/t-shirts">T-shirts</Link><Link href="/collections/werkkleding">Werkkleding</Link></div>
      <div><h3>Service</h3><Link href="/pages/contact">Contact</Link><Link href="/pages/verzending">Verzending</Link><Link href="/pages/retourbeleid">Retourbeleid</Link><Link href="/pages/size-guide">Maattabel</Link></div>
      <div><h3>Samkill</h3><Link href="/pages/over-ons">Over ons</Link><Link href="/pages/groothandel">Groothandel</Link><Link href="/blog">Journal</Link></div>
      <div><h3>Bedrijfsgegevens</h3><p>Modemstraat 10<br/>1033 RW Amsterdam</p><p>KVK 34358165<br/>BTW NL002265391B81</p></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Samkill</span><span>Amsterdam · Nederland</span></div>
  </footer>;
}
