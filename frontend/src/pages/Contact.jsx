// frontend/src/pages/Contact.jsx

export default function Contact() {
  return (
    <div className="flex items-center justify-center m-[90px]">
      <div className="flex flex-col p-10 justify-center items-center bg-white/80 dark:bg-gray-900/70 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-[15px] border border-gray-200 dark:border-gray-700 w-full max-w-4xl transition-colors">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Send Us a Message
        </h2>
        <form
          action="/submit" // Change this to your form handler endpoint
          method="POST"
          className="space-y-4 w-full text-gray-800 dark:text-gray-200"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg text-gray-700 dark:text-gray-200">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg text-gray-700 dark:text-gray-200">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-lg text-gray-700 dark:text-gray-200">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
