import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/public/Navbar';
import { properties } from '../../data/properties';

// --- Footer Component ---
const Footer = () => (
  <footer className="bg-luxury-dark text-gray-400 mt-20 py-12 border-t border-gray-800">
    <div className="container mx-auto text-center">
      <p className="text-xl font-serif text-white mb-4">LUXURY<span className="text-luxury-gold">ESTATES</span></p>
      <p className="text-sm">© 2026 Premium Real Estate Group. All rights reserved.</p>
    </div>
  </footer>
);

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  // --- STATE MANAGEMENT ---
  // --- UPDATED: Gallery State ---
  const [activeImage, setActiveImage] = useState(property?.imageUrl || '');
  
  // Reviews
  const [reviews, setReviews] = useState(property?.reviews || []);
  const [newReview, setNewReview] = useState('');

  // Chatbox
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hello! How can I help you with this property?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // --- UPDATED: Mortgage Calculator State ---
  const [downPayment, setDownPayment] = useState(property ? property.price * 0.2 : 0);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);

  if (!property) {
    return <div className="text-center mt-20 text-2xl font-serif">Property not found.</div>;
  }

  // --- CALCULATIONS ---
  // --- UPDATED: Gallery Images ---
  const images = property.images || [property.imageUrl]; // Assume images array exists, fallback to single image
  
  // --- UPDATED: Mortgage Calculation Logic ---
  const loanAmount = property.price - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  const monthlyPayment = loanAmount > 0 
    ? (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    : 0;

  // Amenities
  const amenities = property.location === 'Dubai' 
    ? ['Private Beach', 'Infinity Pool', 'Smart Home System', 'Concierge']
    : ['Rooftop Terrace', 'Private Gym', '24/7 Security', 'Valet Parking'];

  // --- HANDLERS ---
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    const reviewObject = { id: Date.now(), user: "Guest User", rating: 5, comment: newReview };
    setReviews([reviewObject, ...reviews]);
    setNewReview('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: 'user', text: newMessage }]);
    setNewMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'agent', text: 'Thank you for your message! Our agent will get back to you shortly.' }]);
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto p-6 md:p-10">
        
        {/* --- UPDATED: GALLERY VIEW --- */}
        <div className="mb-10">
          <img src={activeImage} alt={property.title} className="w-full h-[60vh] object-cover rounded-sm mb-4 shadow-lg"/>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${property.title} ${index + 1}`}
                onClick={() => setActiveImage(img)}
                className={`h-24 object-cover rounded-sm cursor-pointer border-4 ${activeImage === img ? 'border-luxury-gold' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h1 className="text-5xl font-serif text-luxury-dark mb-4">{property.title}</h1>
            <p className="text-3xl text-luxury-gold font-semibold mb-6">${property.price.toLocaleString()}</p>
            
            <div className="flex space-x-6 text-luxury-grey mb-8 border-y py-4">
              <span>{property.beds} Bedrooms</span>
              <span>{property.baths} Bathrooms</span>
              <span>{property.sqft} Sq Ft</span>
            </div>

            {/* Virtual Tour */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Virtual Tour</h2>
              <iframe 
                width="100%" 
                height="400" 
                src={property.virtualTour} 
                title="Virtual Tour"
                frameBorder="0"
                allowFullScreen
                className="rounded-sm shadow-lg"
              ></iframe>
            </div>

            {/* Amenities */}
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {amenities.map(item => (
                <div key={item} className="bg-luxury-light p-4 rounded-sm text-sm text-luxury-dark flex items-center">
                  <span className="text-luxury-gold mr-2">✦</span> {item}
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              {property.description}
            </p>

            {/* Reviews */}
            <div className="border-t pt-10">
              <h2 className="text-2xl font-semibold mb-6">Client Reviews</h2>
              <form onSubmit={handleSubmitReview} className="mb-10 bg-luxury-light p-6 rounded-sm">
                <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Share your experience..." className="w-full p-3 border rounded-sm mb-4 h-24"/>
                <button type="submit" className="bg-luxury-dark text-white px-6 py-2 hover:bg-luxury-gold transition">Submit Review</button>
              </form>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{review.user}</h4>
                      <span className="text-luxury-gold">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Contact Agent */}
            <div className="bg-luxury-light p-8 rounded-sm h-fit">
              <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Name:</strong> Alexander Pierce</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p className="text-sm text-gray-600 mb-6"><strong>Email:</strong> alexander@luxuryestates.com</p>
              <button className="w-full bg-luxury-dark text-white p-4 uppercase tracking-widest text-sm hover:bg-luxury-gold transition mb-4">Request Viewing</button>
            </div>

            {/* --- UPDATED: CALCULATOR --- */}
            <div className="bg-white border rounded-sm p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Mortgage Calculator</h3>
              <div className="space-y-4 text-sm mb-6">
                <div>
                  <label className="block text-gray-600">Down Payment ($)</label>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full p-2 border rounded-sm" />
                </div>
                <div>
                  <label className="block text-gray-600">Interest Rate (%)</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full p-2 border rounded-sm" />
                </div>
                <div>
                  <label className="block text-gray-600">Loan Term (Years)</label>
                  <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full p-2 border rounded-sm" />
                </div>
              </div>
              <div className="bg-luxury-light p-4 rounded-sm text-center">
                <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
                <p className="text-3xl font-bold text-luxury-gold">${monthlyPayment.toFixed(2)}</p>
              </div>
            </div>

            {/* Chatbox */}
            <div className="bg-white border rounded-sm p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Live Chat</h3>
              <div className="h-64 overflow-y-auto border-b mb-4 p-2 space-y-4 text-sm">
                {messages.map((msg, index) => (
                  <div key={index} className={`p-2 rounded-sm ${msg.sender === 'user' ? 'bg-luxury-gold text-white ml-auto' : 'bg-luxury-light text-luxury-dark'} w-3/4`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-sm"
                />
                <button type="submit" className="bg-luxury-dark text-white px-4 py-2 hover:bg-luxury-gold transition">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;