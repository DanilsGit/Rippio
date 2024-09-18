import { useParams } from "react-router-dom";
import { useMessageMutaion, useMessageQuery, useMessageSubscription } from "../hooks/custom-hooks";

export default function OrderChat() {
    const { idOrder } = useParams();
    const { data, loading } = useMessageQuery({ idOrder });
    useMessageSubscription({ idOrder });
    const { handleSummit, handleChange, message, error } = useMessageMutaion({ idOrder });
    
    if (loading) return <p>Loading...</p>;
    
    return (
        <div>
            <h1>Order Chat</h1>
            <h2>Order: {idOrder}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSummit}>
                <input
                    type="text"
                    name="message"
                    placeholder="Message"
                    value={message.message}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="userId"
                    placeholder="User"
                    value={message.userId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="restaurantId"
                    placeholder="Restaurant"
                    value={message.restaurantId}
                    onChange={handleChange}
                />
                <button>Send</button>
            </form>
            <ul>
                {data.getAllMessages.map((message, index) => (
                    <li key={index}>
                        <div style={{ border: "1px solid black", marginBottom: '5px' }}>
                            <p>{message.sent_by}</p>
                            <p>{message.message}</p>
                            <p>{message.created_at}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}