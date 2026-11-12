import Link from "next/link";
export default function NotFound() { return <div className="state-page"><p className="eyebrow">404</p><h1>Deze pagina is uit de collectie.</h1><p>De link is mogelijk verouderd of het item is verplaatst.</p><div><Link className="button button-dark" href="/">Naar home</Link><Link className="text-link" href="/zoeken">Zoeken</Link></div></div>; }
