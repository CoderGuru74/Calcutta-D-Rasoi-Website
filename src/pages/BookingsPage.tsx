import { useState } from 'react';
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare, MapPin } from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser'; 

// 🚨🚨 CONFIGURATION 🚨🚨
// --- YOUR LIVE IDS ---
const EMAILJS_SERVICE_ID = 'service_1yaqp9d'; 
const EMAILJS_BOOKING_TEMPLATE_ID = 'template_11kabyr'; 
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_11kabyr'; // ⬅️ ASSUMING you want to use the same ID for both forms
const EMAILJS_PUBLIC_KEY = 'dj9-PXBKkF17KAJHb'; 
const RECIPIENT_EMAIL = 'calcutta.d.rasoicafe@gmail.com'; 
// ----------------------

// Initialize EmailJS once outside the component
if (typeof window !== 'undefined' && EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}
// 🚨🚨 END CONFIGURATION 🚨🚨


type FormType = 'booking' | 'contact';

export default function BookingsPage() {
  const { mode, accentColor } = useMode();
  const [formType, setFormType] = useState<FormType>('booking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Thematic background image for dark ambiance
  const kolkataBgUrl = 'https://images.pexels.com/photos/3313936/pexels-photo-3313936.jpeg?auto=compress&cs=tinysrgb&w=1920'; 

  // Dynamic focus ring colors
  const focusRingClasses = mode === 'restaurant' 
    ? 'focus:ring-[#005051] focus:border-[#005051]' // Teal
    : 'focus:ring-[#FCD12A] focus:border-[#FCD12A]'; // Mustard

  const [bookingForm, setBookingForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    booking_date: '',
    booking_time: '',
    number_of_guests: 2,
  });

  const [contactForm, setContactForm] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    message: '',
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // 1. SAVE DATA TO SUPABASE
      const { error: dbError } = await supabase
        .from('table_bookings')
        .insert([bookingForm]);

      if (dbError) throw dbError;

      // 2. SEND EMAIL NOTIFICATION VIA EMAILJS
      const templateParams = {
        // Recipient
        to_email: RECIPIENT_EMAIL, 
        
        // Data fields matching the EmailJS Template
        customer_name: bookingForm.customer_name,
        customer_phone: bookingForm.customer_phone,
        customer_email: bookingForm.customer_email,
        booking_date: bookingForm.booking_date,
        booking_time: bookingForm.booking_time,
        number_of_guests: bookingForm.number_of_guests,
        
        reply_to: bookingForm.customer_email 
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_BOOKING_TEMPLATE_ID, // ⬅️ Using the Booking Template ID
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // 3. SUCCESS
      setSubmitMessage('Booking request sent successfully! We will confirm shortly.');
      setBookingForm({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        booking_date: '',
        booking_time: '',
        number_of_guests: 2,
      });

    } catch (error) {
      console.error('Error submitting booking or sending email:', error);
      setSubmitMessage('Failed to submit booking. Please check your network and EmailJS setup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // 1. SAVE DATA TO SUPABASE
      const { error: dbError } = await supabase
        .from('contact_inquiries')
        .insert([contactForm]);

      if (dbError) throw dbError;

      // 2. SEND EMAIL NOTIFICATION VIA EMAILJS
      const templateParams = {
        to_email: RECIPIENT_EMAIL, 
        
        customer_name: contactForm.customer_name,
        customer_email: contactForm.customer_email,
        subject: contactForm.subject,
        message: contactForm.message, 
        
        reply_to: contactForm.customer_email 
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE_ID, // ⬅️ Using the Contact Template ID
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // 3. SUCCESS
      setSubmitMessage('Message sent successfully! We will get back to you soon.');
      setContactForm({
        customer_name: '',
        customer_email: '',
        subject: '',
        message: '',
      });
      
    } catch (error) {
      console.error('Error submitting contact form or sending email:', error);
      setSubmitMessage('Failed to send message. Please check your network and EmailJS setup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-700"
        style={{
          backgroundImage: `url('${kolkataBgUrl}')`,
        }}
      >
        {/* Dark overlay to ensure text visibility and 'story' feel */}
        <div className="absolute inset-0 bg-black/60" /> 
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}25 100%)`,
        }}
      />

      <div className="relative z-10 px-4 py-32">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fadeIn">
            <h1
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              Book Your Experience
            </h1>
            <p className="text-xl text-gray-200">
              Reserve your table or send us your inquiries
            </p>
          </div>
          
          {/* VISIT US / LOCATION SECTION */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 animate-fadeIn">
            <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>
                <MapPin size={28} className="inline mr-2" />
                Visit Us
            </h2>
            <p className="text-gray-700 text-lg font-medium mb-1">
                Calcutta-d-Rasoi
            </p>
            <p className="text-gray-600">
                North Bazzar, Opposit Fancy Plazza,
            </p>
            <p className="text-gray-600">
                Andal - 713321
            </p>
          </div>
          {/* END LOCATION SECTION */}

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden animate-fadeIn animation-delay-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setFormType('booking')}
                className={`flex-1 py-4 px-6 font-bold text-lg transition-all duration-300 ${
                  formType === 'booking' ? 'border-b-4' : 'text-gray-500'
                }`}
                style={{
                  borderColor: formType === 'booking' ? accentColor : 'transparent',
                  color: formType === 'booking' ? accentColor : undefined,
                }}
              >
                Table Booking
              </button>
              <button
                onClick={() => setFormType('contact')}
                className={`flex-1 py-4 px-6 font-bold text-lg transition-all duration-300 ${
                  formType === 'contact' ? 'border-b-4' : 'text-gray-500'
                }`}
                style={{
                  borderColor: formType === 'contact' ? accentColor : 'transparent',
                  color: formType === 'contact' ? accentColor : undefined,
                }}
              >
                Contact Us
              </button>
            </div>

            <div className="p-8">
              {formType === 'booking' ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User size={18} style={{ color: accentColor }} />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.customer_name}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, customer_name: e.target.value })
                        }
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone size={18} style={{ color: accentColor }} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.customer_phone}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, customer_phone: e.target.value })
                        }
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                        placeholder="Enter your phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail size={18} style={{ color: accentColor }} />
                        Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingForm.customer_email}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, customer_email: e.target.value })
                      }
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar size={18} style={{ color: accentColor }} />
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.booking_date}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, booking_date: e.target.value })
                        }
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Clock size={18} style={{ color: accentColor }} />
                        Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={bookingForm.booking_time}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, booking_time: e.target.value })
                        }
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Users size={18} style={{ color: accentColor }} />
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="20"
                      value={bookingForm.number_of_guests}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          number_of_guests: parseInt(e.target.value),
                        })
                      }
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                    />
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-4 rounded-xl ${
                        submitMessage.includes('success')
                          ? 'bg-green-50 text-green-800'
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: accentColor,
                      color: mode === 'restaurant' ? '#F5F5DC' : '#1F2937',
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Table'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User size={18} style={{ color: accentColor }} />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.customer_name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, customer_name: e.target.value })
                        }
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail size={18} style={{ color: accentColor }} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.customer_email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, customer_email: e.target.value })
                        }
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MessageSquare size={18} style={{ color: accentColor }} />
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                      placeholder="What is your inquiry about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      rows={6}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${focusRingClasses}`}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-4 rounded-xl ${
                        submitMessage.includes('success')
                          ? 'bg-green-50 text-green-800'
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: accentColor,
                      color: mode === 'restaurant' ? '#F5F5DC' : '#1F2937',
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}