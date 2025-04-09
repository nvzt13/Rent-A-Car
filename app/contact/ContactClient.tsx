"use client";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Gönderiliyor...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Mesajınız başarıyla gönderildi!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Gönderim başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.log(error)
      setStatus("Bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800">Bize Ulaşın</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Adınız"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-posta"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefon"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mesajınız"
          required
          className="w-full p-2 border rounded h-32"
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Gönder</button>
      </form>
      {status && <p className="mt-2 text-center text-gray-700 dark:text-gray-300">{status}</p>}

      {/* Sosyal Medya Linkleri */}
      <div className="mt-6 flex justify-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-blue-400 text-2xl hover:text-blue-600" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-pink-500 text-2xl hover:text-pink-700" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900" />
        </a>
      </div>
    </div>
  );
}
