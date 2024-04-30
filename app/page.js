import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";

export default function Home({ searchParams: { search } }) {
    return (
        <section className="container">
            <Header />
            <EventList search={search} />
        </section>
    );
}
