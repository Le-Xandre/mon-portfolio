import { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjkgjbzq';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _gotcha: '',
  });

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot : un visiteur normal ne remplit jamais ce champ.
    // Formspree ignore les soumissions qui contiennent une valeur ici.
    if (formData._gotcha) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _gotcha: formData._gotcha,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.errors?.[0]?.message ||
          'Une erreur est survenue lors de l’envoi du message.'
        );
      }

      setStatus('success');

      setFormData({
        name: '',
        email: '',
        message: '',
        _gotcha: '',
      });
    } catch (error) {
      console.error('Erreur formulaire de contact :', error);

      setStatus('error');
      setErrorMessage(
        error.message ||
        'Impossible d’envoyer le message pour le moment. Vous pouvez également me contacter via mes réseaux sociaux.'
      );
    }
  };

  return (
    <section className="glass-section py-10 max-w-6xl mx-auto my-10 max-w-4xl mx-auto dark:bg-gray-800">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="neon-glow text-gray-900 dark:text-white text-xl md:text-4xl text-center font-semibold mb-4 text-lime-200">
          Contact
        </h2>

        {status === 'success' ? (
          <div className="mt-8 text-center text-gray-700 dark:text-gray-300">
            <p>Merci pour votre message !</p>
            <p className="mt-2 text-sm">
              Votre message a bien été transmis.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-gray-700 dark:text-gray-300"
              >
                Nom
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-gray-700 dark:text-gray-300"
              >
                Email
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-gray-700 dark:text-gray-300"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>

            {/* Honeypot anti-spam : invisible pour les visiteurs */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
              }}
            >
              <label htmlFor="contact-gotcha">
                Ne pas remplir ce champ
              </label>

              <input
                id="contact-gotcha"
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {status === 'error' && (
              <p
                role="alert"
                className="text-center text-red-600 dark:text-red-400"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
