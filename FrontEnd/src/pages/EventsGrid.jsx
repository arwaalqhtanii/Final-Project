import EventCard from "./EventCard";

const EventsGrid = ({ events }) => {
    return (
        <div className="container mx-auto px-12 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {events.length > 0 ? (
                    events.map((event) => (
                        <EventCard key={event.id || event.name} event={event} />
                    ))
                ) : (
                    <p className="text-center text-xl">Sorry, no events match your search.</p>
                )}
            </div>
        </div>
    );
};

export default EventsGrid;

