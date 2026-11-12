"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  return <div className="product-gallery">
    <div className="gallery-main"><Image src={images[active]} alt={`${title}, afbeelding ${active + 1}`} fill priority={active === 0} sizes="(max-width: 900px) 100vw, 58vw" /></div>
    <div className="gallery-thumbs" aria-label="Productafbeeldingen">
      {images.map((image, index) => <button className={index === active ? "active" : ""} key={image} onClick={() => setActive(index)} aria-label={`Bekijk afbeelding ${index + 1}`}><Image src={image} alt="" fill sizes="100px" /></button>)}
    </div>
  </div>;
}
