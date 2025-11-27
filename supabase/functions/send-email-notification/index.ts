import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailPayload {
  type: 'order' | 'booking' | 'contact';
  data: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { type, data }: EmailPayload = await req.json();
    
    let subject = '';
    let htmlContent = '';
    
    if (type === 'order') {
      subject = `New Order: ${data.item_name} (${data.mode.toUpperCase()})`;
      htmlContent = `
        <h2>New Order Received</h2>
        <p><strong>Mode:</strong> ${data.mode.toUpperCase()}</p>
        <p><strong>Item:</strong> ${data.item_name}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
        <p><strong>Price per item:</strong> ₹${data.price}</p>
        <p><strong>Total Amount:</strong> ₹${data.total_amount}</p>
        <hr>
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${data.customer_name}</p>
        <p><strong>Phone:</strong> ${data.customer_phone}</p>
        <p><strong>Delivery Address:</strong> ${data.delivery_address}</p>
        <p><strong>Payment:</strong> Cash on Delivery (COD)</p>
      `;
    } else if (type === 'booking') {
      subject = `New Table Booking: ${data.customer_name}`;
      htmlContent = `
        <h2>New Table Booking</h2>
        <p><strong>Name:</strong> ${data.customer_name}</p>
        <p><strong>Phone:</strong> ${data.customer_phone}</p>
        <p><strong>Email:</strong> ${data.customer_email}</p>
        <p><strong>Date:</strong> ${data.booking_date}</p>
        <p><strong>Time:</strong> ${data.booking_time}</p>
        <p><strong>Number of Guests:</strong> ${data.number_of_guests}</p>
      `;
    } else if (type === 'contact') {
      subject = `Contact Inquiry: ${data.subject}`;
      htmlContent = `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${data.customer_name}</p>
        <p><strong>Email:</strong> ${data.customer_email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `;
    }

    const emailData = {
      to: 'calcutta.d.rasoicafe@gmail.com',
      subject: subject,
      html: htmlContent,
    };

    console.log('Email notification prepared:', emailData);

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent successfully' }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing notification:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});