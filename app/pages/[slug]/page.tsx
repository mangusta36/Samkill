import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentPages, getContentPage } from "@/data/pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return contentPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const page = getContentPage((await params).slug); return page ? { title: page.title, description: page.description, alternates: { canonical: `/pages/${page.slug}` } } : {}; }
export default async function ContentPage({ params }: Props) { const page = getContentPage((await params).slug); if (!page) notFound(); return <div className="content-page"><nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{page.title}</span></nav><header><p className="eyebrow">Samkill service</p><h1>{page.title}</h1></header><div className="content-body">{page.content}</div></div>; }
