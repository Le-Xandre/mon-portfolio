import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add email sending logic here (e.g., using EmailJS or a backend API)
    setSubmitted(true);
  };

  return (
      <section className="py-10 max-w-6xl mx-auto dark:bg-gray-800">
          
      <div className="max-w-2xl mx-auto px-4">
              <h2 className="text-4xl font-extrabold text-center neon-glow text-gray-900 dark:text-white">Contact</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 h-32"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Envoyer
            </button>
          </form>
        ) : (
          <p className="mt-8 text-center text-gray-700 dark:text-gray-300">Merci pour votre message !</p>
        )}
      </div>
    </section>
  );
}
