"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="state-page"><p className="eyebrow">Er ging iets mis</p><h1>Deze look laadt even niet.</h1><p>Probeer de pagina opnieuw. Je winkelwagen blijft lokaal bewaard.</p><button className="button button-dark" onClick={reset}>Opnieuw proberen</button></div>; }
