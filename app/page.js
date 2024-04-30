import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function Home({ searchParams: { search } }) {
    return (
        <section className="container">
            <Header />
            <Suspense key={search} fallback={<Loading />}>
                <EventList search={search} />
            </Suspense>
        </section>
    );
}
