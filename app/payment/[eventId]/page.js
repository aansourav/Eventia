import PaymentForm from "@/components/payments/PaymentForm";
import { getEventById } from "@/db/queries";

const PaymentPage = async ({ params: { eventId } }) => {
    const { name } = await getEventById(eventId);
    return (
        <section className="container">
            <h1 className="text-2xl font-bold text-center ">
                Book Your Seat! Complete your payment for {name}
            </h1>
            <div className="bg-[#242526] p-6 rounded-lg max-w-xl mx-auto my-12">
                <h2 className="font-bold text-xl mb-8">Payment Details</h2>
                <PaymentForm eventId={eventId} />
            </div>
        </section>
    );
};

export default PaymentPage;
