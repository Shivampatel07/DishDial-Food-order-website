import React, { useState } from "react";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by selecting your desired items from the menu, adding them to your cart, and then proceeding to checkout.",
    },
    {
      question: "What are the payment options?",
      answer:
        "We accept various payment methods including credit cards, debit cards, and digital wallets.",
    },
    {
      question: "How long does it take to deliver my order?",
      answer:
        "Delivery times may vary depending on your location and the restaurant's operating hours.",
    },
    {
      question: "Can I make a reservation?",
      answer:
        "Yes, you can make a reservation by visiting our website or calling our customer service line.",
    },
    {
      question: "Do you offer takeout?",
      answer:
        "Yes, we offer takeout services. You can place your order online and pick it up at the restaurant.",
    },
    {
      question: "What time do you close?",
      answer:
        "Our last order time is typically  30 minutes before closing, but this may vary by location.",
    },
    {
      question: "Do you have a loyalty program?",
      answer:
        "Yes, we have a loyalty program where you can earn points for each purchase and redeem them for discounts.",
    },
    {
      question: "Can I order for someone else?",
      answer:
        "Yes, you can order for someone else by providing their name and contact information during checkout.",
    },
    {
      question: "Do you have dietary restrictions?",
      answer:
        "Yes, we can accommodate most dietary restrictions. Please specify your requirements when placing your order.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy varies by location, but generally, orders can be returned within a certain time frame if they are unopened and undamaged.",
    },
    {
      question: "Do you offer online ordering?",
      answer:
        "Yes, we offer online ordering through our website and mobile app, allowing you to place orders from the comfort of your home.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes, you can track the status of your order through our website or mobile app.",
    },
    {
      question: "Do you have a catering service?",
      answer:
        "Yes, we offer catering services for events such as weddings, corporate functions, and parties.",
    },
    {
      question: "What are your hours of operation?",
      answer:
        "Our hours of operation vary by location, but typically we are open for lunch and dinner.",
    },
    {
      question: "Do you have a drive-thru?",
      answer:
        "Yes, some of our locations offer a drive-thru service for your convenience.",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "You can contact our customer service by calling our hotline number or sending us an email.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="search"
          >
            Search Help Topics
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
        <dl className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index}>
              <dt className="text-lg font-medium">{faq.question}</dt>
              <dd className="text-gray-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Help;
